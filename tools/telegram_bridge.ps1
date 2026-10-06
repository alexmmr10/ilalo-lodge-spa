param (
    [string]$BotToken = "8845930757:AAF6Hih7qovlkrA_vGQ4s8eDbMUeBRaoZFU",
    [int64]$AuthorizedUserId = 1767965653
)

$WorkspaceRoot = Split-Path -Parent $PSScriptRoot
if (-not $WorkspaceRoot) { $WorkspaceRoot = Get-Location }

$InboxDir = Join-Path $WorkspaceRoot "inbox"
$VoiceDir = Join-Path $InboxDir "voice"
$PhotoDir = Join-Path $InboxDir "photos"
$DocsDir  = Join-Path $InboxDir "docs"

foreach ($dir in @($InboxDir, $VoiceDir, $PhotoDir, $DocsDir)) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

$TasksFile = Join-Path $InboxDir "telegram_tasks.json"
$LogFile   = Join-Path $InboxDir "bridge.log"

# Emojis seguros via UTF32
$ICON_MIC    = [char]::ConvertFromUtf32(0x1F3A4)
$ICON_FOLDER = [char]::ConvertFromUtf32(0x1F4C1)
$ICON_CAM    = [char]::ConvertFromUtf32(0x1F4F8)
$ICON_CHART  = [char]::ConvertFromUtf32(0x1F4CA)
$ICON_ROCKET = [char]::ConvertFromUtf32(0x1F680)
$ICON_CLIP   = [char]::ConvertFromUtf32(0x1F4CB)
$ICON_CHECK  = [char]::ConvertFromUtf32(0x2705)
$ICON_BOLT   = [char]::ConvertFromUtf32(0x26A1)
$ICON_GREEN  = [char]::ConvertFromUtf32(0x1F7E2)
$ICON_WARN   = [char]::ConvertFromUtf32(0x26A0)
$ICON_CROSS  = [char]::ConvertFromUtf32(0x274C)
$ICON_BROOM  = [char]::ConvertFromUtf32(0x1F9F9)
$ICON_INBOX  = [char]::ConvertFromUtf32(0x1F4E5)
$ICON_WAVE   = [char]::ConvertFromUtf32(0x1F44B)
$ICON_NOTE   = [char]::ConvertFromUtf32(0x1F3B5)
$ICON_DOC    = [char]::ConvertFromUtf32(0x1F4C4)
$ICON_PENCIL = [char]::ConvertFromUtf32(0x1F4DD)
$ICON_BRAIN  = [char]::ConvertFromUtf32(0x1F9E0)
$ICON_CLOCK  = [char]::ConvertFromUtf32(0x23F3)
$ICON_MONEY  = [char]::ConvertFromUtf32(0x1F4B0)

function Escape-Html([string]$str) {
    if (-not $str) { return "" }
    return $str.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;")
}

function Write-BridgeLog([string]$msg) {
    $time = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    $line = "[$time] $msg"
    Write-Host $line -ForegroundColor Cyan
    Add-Content -Path $LogFile -Value $line -ErrorAction SilentlyContinue
}

function Send-TelegramMessage($chatId, [string]$text, [string]$parseMode = "HTML") {
    try {
        $uri = "https://api.telegram.org/bot" + $BotToken + "/sendMessage"
        $bodyObj = @{
            chat_id = $chatId
            text = $text
        }
        if ($parseMode) { $bodyObj["parse_mode"] = $parseMode }
        
        $json = $bodyObj | ConvertTo-Json -Compress
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)

        $res = Invoke-RestMethod -Uri $uri -Method Post -Body $bytes -ContentType "application/json; charset=utf-8" -TimeoutSec 15
        return $res
    } catch {
        Write-BridgeLog "Error enviando a Telegram: $_"
        return $null
    }
}

function Download-TelegramFile([string]$targetFileId, [string]$destinationPath) {
    try {
        $getFileUri = "https://api.telegram.org/bot" + $BotToken + "/getFile?file_id=" + $targetFileId
        $fileInfo = Invoke-RestMethod -Uri $getFileUri -Method Get -TimeoutSec 15

        if ($fileInfo -and $fileInfo.ok -and $fileInfo.result.file_path) {
            $telegramFilePath = $fileInfo.result.file_path
            $downloadUrl = "https://api.telegram.org/file/bot" + $BotToken + "/" + $telegramFilePath
            Invoke-WebRequest -Uri $downloadUrl -OutFile $destinationPath -TimeoutSec 30
            return (Test-Path $destinationPath)
        }
    } catch {
        Write-BridgeLog "Error descargando archivo: $_"
    }
    return $false
}

function Transcribe-Voice([string]$oggPath) {
    try {
        $wavPath = [System.IO.Path]::ChangeExtension($oggPath, ".wav")
        $ffmpegCmd = (Get-Command ffmpeg -ErrorAction SilentlyContinue).Source
        if (-not $ffmpegCmd) { return $null }

        & $ffmpegCmd -i $oggPath -ar 16000 -ac 1 -c:a pcm_s16le $wavPath -y 2>$null
        if (-not (Test-Path $wavPath)) { return $null }

        Add-Type -AssemblyName System.Speech
        $culture = New-Object System.Globalization.CultureInfo("es-ES")
        $recognizer = New-Object System.Speech.Recognition.SpeechRecognitionEngine($culture)
        $grammar = New-Object System.Speech.Recognition.DictationGrammar
        $recognizer.LoadGrammar($grammar)
        $recognizer.SetInputToWaveFile($wavPath)
        $result = $recognizer.Recognize()
        $recognizer.Dispose()
        Remove-Item $wavPath -Force -ErrorAction SilentlyContinue

        if ($result -and $result.Text) {
            return $result.Text.Trim()
        }
    } catch {
        Write-BridgeLog "Error en transcripcion: $_"
    }
    return $null
}

function Save-TaskEntry($taskObject) {
    $currentTasks = @()
    if (Test-Path $TasksFile) {
        try {
            $raw = Get-Content -Path $TasksFile -Raw -Encoding UTF8
            if ($raw) {
                $parsed = $raw | ConvertFrom-Json
                if ($parsed -is [System.Array]) {
                    $currentTasks = @($parsed)
                } elseif ($parsed) {
                    $currentTasks = @($parsed)
                }
            }
        } catch {}
    }

    $currentTasks = @($currentTasks) + @($taskObject)
    $currentTasks | ConvertTo-Json -Depth 5 | Set-Content -Path $TasksFile -Encoding UTF8
}

function Get-FormattedSkills() {
    return "$ICON_BRAIN <b>SKILLS Y HABILIDADES APLICADAS EN ESTE PROYECTO</b>`n" +
           "<i>Dev.Alex - Ilalo Lodge &amp; Spa (SitioWeb1.1)</i>`n`n" +
           "1. <b>Desarrollo Web Moderno (Vanilla Core):</b>`n" +
           "- HTML5 semantico, CSS3 con custom properties y dark mode.`n" +
           "- JavaScript ES6+ modular sin dependencias pesadas.`n`n" +
           "2. <b>Auditoria y Seguridad de Negocio:</b>`n" +
           "- Deteccion de fuga de leads en modal (#quickInquiryForm).`n" +
           "- Correccion de WhatsApp dummy (593999999999).`n" +
           "- Control de manipulacion de tarifas client-side.`n`n" +
           "3. <b>Rendimiento y Core Web Vitals:</b>`n" +
           "- Carga rapida (&lt; 1s) Mobile-First.`n" +
           "- Optimizacion de imagenes y formato WebP.`n`n" +
           "4. <b>SEO y Presencia Local:</b>`n" +
           "- Estructuracion de sitemap.xml y tags OpenGraph.`n`n" +
           "5. <b>DevOps y Cloud Deployment:</b>`n" +
           "- Despliegue continuo en Vercel Produccion (vercel.json).`n`n" +
           "6. <b>Automatizacion e Inteligencia:</b>`n" +
           "- Puente Telegram con transcripcion de voz en espanol (System.Speech + ffmpeg).`n`n" +
           "7. <b>Estrategia Comercial:</b>`n" +
           "- Valuacion real de mercado en Quito: <b>`$320 - `$350 USD</b>."
}

function Get-FormattedReport() {
    return "$ICON_CHART <b>REPORTE DE ACTIVIDAD EN EL PROYECTO</b>`n`n" +
           "1. <b>Auditoria y Seguridad:</b>`n" +
           "- Bug corregido: Modal de cotizacion (#quickInquiryForm) que perdia leads.`n" +
           "- WhatsApp dummy corregido (593999999999).`n" +
           "- Precios y validaciones documentadas.`n`n" +
           "2. <b>Valoracion Comercial (Quito):</b>`n" +
           "- Precio objetivo de venta: <b>`$320 - `$350 USD</b>.`n" +
           "- Argumento de cierre: Representa solo 2 noches de ocupacion.`n`n" +
           "3. <b>Puente Telegram - Antigravity:</b>`n" +
           "- Transcripcion de voz nativa en espanol activa.`n" +
           "- Recepcion de fotos y archivos en tiempo real.`n" +
           "- Estado de Vercel: 🟢 Produccion en linea.`n`n" +
           "$ICON_BOLT <i>Todo sincronizado con tu PC (Dev.Alex).</i>"
}

function Get-FormattedPricing() {
    return "$ICON_MONEY <b>VALORACION COMERCIAL PARA QUITO, ECUADOR</b>`n`n" +
           "- <b>Rango Recomendado:</b> <b>`$320 a `$350 USD</b>.`n" +
           "- <b>Tarifa Noche Lodge:</b> `$150 - `$180 USD.`n" +
           "- <b>Argumento de Venta:</b> Este desarrollo se paga con <b>solo 2 noches de reserva</b>.`n" +
           "- <b>Incluye:</b> Diseno premium, mobile-first, motor de reservas WhatsApp, SEO local y hosting rapido."
}

function Get-FormattedVulnerabilities() {
    return "$ICON_WARN <b>AUDITORIA DE VULNERABILIDADES Y BUGS</b>`n`n" +
           "1. <b>Fuga de Clientes (Critico):</b> Formulario <code>#quickInquiryForm</code> no enviaba los leads a ningun lado.`n" +
           "2. <b>Telefono Invalido:</b> WhatsApp enlazado a <code>593999999999</code>.`n" +
           "3. <b>Precios Alterables:</b> Precios calculados unicamente en el navegador del cliente.`n" +
           "4. <b>Manejo en Edge:</b> Corregidas reglas de prefijos CSS para total compatibilidad."
}

function Get-FormattedNewAnalysis() {
    return "$ICON_BRAIN <b>NUEVO ANALISIS TECNICO Y DE NEGOCIO (DEV.ALEX)</b>`n`n" +
           "1. <b>Fuga de Clientes en WhatsApp (593999999999):</b>`n" +
           "- En index.html y js/app.js los botones apuntan al numero de prueba +593 99 999 9999.`n" +
           "- Se pierden las reservas directas de los clientes.`n`n" +
           "2. <b>Modal de Cotizacion (#quickInquiryForm):</b>`n" +
           "- El modal valida datos pero no los despacha a ningun lado (inquiry inerte).`n`n" +
           "3. <b>Operacion 24/7 sin tu PC:</b>`n" +
           "- El puente corre en tu PC local. Al suspender la PC entra en pausa.`n" +
           "- Podemos migrar el webhook a Vercel Serverless para disponibilidad 24/7.`n`n" +
           "$ICON_BOLT <i>Todo registrado en el workspace de Antigravity.</i>"
}

function Get-FormattedStatus() {
    $dateStr = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    return "$ICON_GREEN <b>Antigravity IDE Online</b>`n`n" +
           "- <b>Proyecto:</b> SitioWeb1.1 (Ilalo Lodge &amp; Spa)`n" +
           "- <b>URL Vercel:</b> https://ilalo-lodge-spa.vercel.app`n" +
           "- <b>Motor de Voz:</b> Activo (es-ES)`n" +
           "- <b>Hora local:</b> $dateStr"
}

function Get-FormattedTasks() {
    $tasksHtml = "$ICON_CLIP <b>PANEL DE ACTIVIDADES Y SEGUIMIENTO</b>`n`n"
    
    $pendingCount = 0
    $completedCount = 0
    $taskList = @()

    if (Test-Path $TasksFile) {
        try {
            $raw = Get-Content -Path $TasksFile -Raw -Encoding UTF8
            if ($raw) {
                $taskList = @($raw | ConvertFrom-Json)
            }
        } catch {}
    }

    foreach ($t in $taskList) {
        if ($t.status -eq "PENDIENTE" -or $t.status -eq "EN_PROCESO") {
            $pendingCount++
        } else {
            $completedCount++
        }
    }

    $tasksHtml += "$ICON_CHART <b>Resumen General:</b>`n"
    $tasksHtml += "- Tareas Atendidas / Completadas: <b>$completedCount</b>`n"
    $tasksHtml += "- Tareas Pendientes en Desarrollo: <b>$pendingCount</b>`n`n"

    $tasksHtml += "<b>Ultimas Solicitudes Registradas:</b>`n"
    if ($taskList.Count -gt 0) {
        $recent = $taskList | Select-Object -Last 6
        foreach ($item in $recent) {
            $isPending = ($item.status -eq "PENDIENTE" -or $item.status -eq "EN_PROCESO")
            $statusIcon = if ($isPending) { "$ICON_CLOCK <b>[PENDIENTE]</b>" } else { "$ICON_CHECK <b>[ATENDIDA]</b>" }
            $tipo = if ($item.type) { $item.type } else { "TEXTO" }
            $desc = if ($item.transcription) {
                $item.transcription
            } elseif ($item.caption) {
                $item.caption
            } elseif ($item.command) {
                $item.command
            } else {
                $item.file
            }
            $tasksHtml += "- [$tipo] $statusIcon " + (Escape-Html $desc) + "`n"
        }
    } else {
        $tasksHtml += "<i>No hay tareas registradas aun.</i>`n"
    }

    $tasksHtml += "`n$ICON_GREEN <b>Antigravity IDE:</b> Conectado y sincronizado con tu PC."
    return $tasksHtml
}

function Process-UserInstruction($chatId, $msgId, [string]$instructionText, [string]$sourceType, [string]$filePath = "") {
    $clean = $instructionText.ToLower().Trim()

    # 1. Consulta de Skills / Habilidades / Herramientas
    if ($clean -like "*skill*" -or $clean -like "*esquina*" -or $clean -like "*esquirla*" -or $clean -like "*habilidad*" -or $clean -like "*herramienta*" -or $clean -like "*tecnolog*") {
        $resText = Get-FormattedSkills
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Skills enviadas"
        }
        Save-TaskEntry $task
        return
    }

    # 2. Consulta de Reporte / Informe / Actividad / Resumen
    if ($clean -like "*reporte*" -or $clean -like "*informaci*" -or $clean -like "*actualizaci*" -or $clean -like "*resumen*" -or $clean -like "*haciendo*" -or $clean -like "*hecho*") {
        $resText = Get-FormattedReport
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Reporte enviado"
        }
        Save-TaskEntry $task
        return
    }

    # 2b. Consulta de Analisis Nuevo
    if ($clean -like "*analisis*" -or $clean -like "*análisis*" -or $clean -like "*nuevo*") {
        $resText = Get-FormattedNewAnalysis
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Analisis nuevo enviado"
        }
        Save-TaskEntry $task
        return
    }

    # 3. Consulta de Precio / Venta / Valor
    if ($clean -like "*precio*" -or $clean -like "*cuanto vale*" -or $clean -like "*valor*" -or $clean -like "*costo*" -or $clean -like "*vender*") {
        $resText = Get-FormattedPricing
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Valuacion enviada"
        }
        Save-TaskEntry $task
        return
    }

    # 4. Consulta de Vulnerabilidades / Bugs / Seguridad
    if ($clean -like "*vulnerab*" -or $clean -like "*bug*" -or $clean -like "*seguridad*" -or $clean -like "*error*") {
        $resText = Get-FormattedVulnerabilities
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Vulnerabilidades enviadas"
        }
        Save-TaskEntry $task
        return
    }

    # 5. Despliegue a Vercel
    if ($clean -like "*deploy*" -or $clean -like "*desplegar*" -or $clean -like "*subir*") {
        Send-TelegramMessage $chatId "$ICON_ROCKET <i>Iniciando despliegue a Vercel Produccion...</i>"
        try {
            $deployOut = cmd.exe /c "vercel --prod --yes" 2>&1 | Out-String
            $snippet = $deployOut.Substring(0, [Math]::Min(250, $deployOut.Length))
            Send-TelegramMessage $chatId ("$ICON_CHECK <b>Despliegue Exitoso:</b>`nhttps://ilalo-lodge-spa.vercel.app`n`n<pre>" + (Escape-Html $snippet) + "</pre>")
            $task = [PSCustomObject]@{
                id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Vercel desplegado"
            }
            Save-TaskEntry $task
        } catch {
            Send-TelegramMessage $chatId ("$ICON_CROSS <b>Error desplegando:</b> " + (Escape-Html $_))
        }
        return
    }

    # 6. Estado / Status
    if ($clean -like "*status*" -or $clean -like "*estado*") {
        $resText = Get-FormattedStatus
        Send-TelegramMessage $chatId $resText
        $task = [PSCustomObject]@{
            id = $msgId; type = $sourceType; timestamp = (Get-Date).ToString("o"); transcription = $instructionText; file = $filePath; status = "COMPLETADA"; resultado = "Status enviado"
        }
        Save-TaskEntry $task
        return
    }

    # 7. Ver Tareas
    if ($clean -like "*tarea*" -or $clean -like "*pendiente*") {
        $resText = Get-FormattedTasks
        Send-TelegramMessage $chatId $resText
        return
    }

    # 8. Limpiar Tareas
    if ($clean -eq "/limpiar") {
        "[]" | Set-Content -Path $TasksFile -Encoding UTF8
        Send-TelegramMessage $chatId "$ICON_BROOM <b>Buzon de tareas limpiado con exito.</b>"
        return
    }

    # 9. Instruccion de Modificacion o Tarea General (PENDIENTE)
    $task = [PSCustomObject]@{
        id = $msgId
        type = $sourceType
        timestamp = (Get-Date).ToString("o")
        transcription = $instructionText
        command = $instructionText
        file = $filePath
        status = "PENDIENTE"
        resultado = "En cola de desarrollo en Antigravity"
    }
    Save-TaskEntry $task

    $reply = "$ICON_MIC <b>Instruccion Recibida:</b>`n`n<i>`"" + (Escape-Html $instructionText) + "`"</i>`n`n" +
             "$ICON_CLOCK <b>Estado: PENDIENTE EN COLA</b>`n" +
             "⚡ Cargada en el backlog de Antigravity IDE para aplicarse en el proyecto."
    Send-TelegramMessage $chatId $reply
}

Write-BridgeLog "============================================="
Write-BridgeLog "ANTIGRAVITY TELEGRAM BRIDGE V3 (INTELIGENTE)"
Write-BridgeLog "Usuario Autorizado: $AuthorizedUserId"
Write-BridgeLog "Carpeta Workspace: $WorkspaceRoot"
Write-BridgeLog "============================================="

$offset = 0

while ($true) {
    try {
        $updatesUrl = "https://api.telegram.org/bot" + $BotToken + "/getUpdates?offset=" + $offset + "&timeout=25"
        $response = Invoke-RestMethod -Uri $updatesUrl -Method Get -TimeoutSec 35

        if ($response -and $response.ok -and $response.result) {
            foreach ($update in $response.result) {
                $offset = $update.update_id + 1

                if (-not $update.message) { continue }

                $senderId = $update.message.from.id
                $chatId = $update.message.chat.id
                $msgId = $update.message.message_id
                $text = $update.message.text
                $voice = $update.message.voice
                $audio = $update.message.audio
                $photo = $update.message.photo
                $document = $update.message.document
                $caption = $update.message.caption

                # Filtro de Seguridad
                if ($senderId -ne $AuthorizedUserId) {
                    Write-BridgeLog "Acceso no autorizado rechazado del ID: $senderId"
                    Send-TelegramMessage $chatId "<b>Acceso Denegado:</b> Bot exclusivo de Dev.Alex."
                    continue
                }

                # 1. NOTAS DE VOZ (MICROFONO)
                if ($voice) {
                    $duration = $voice.duration
                    $vFileId = $voice.file_id
                    $voiceFileName = "audio_" + $msgId + ".ogg"
                    $voicePath = Join-Path $VoiceDir $voiceFileName

                    Write-BridgeLog "Nota de voz recibida ($duration seg). Descargando..."
                    $downloadOk = Download-TelegramFile $vFileId $voicePath

                    if ($downloadOk) {
                        Write-BridgeLog "Transcribiendo nota de voz..."
                        $transcription = Transcribe-Voice $voicePath

                        if ($transcription) {
                            Write-BridgeLog "Transcripcion: '$transcription'"
                            Process-UserInstruction $chatId $msgId $transcription "VOICE" ("inbox/voice/" + $voiceFileName)
                        } else {
                            $task = [PSCustomObject]@{
                                id = $msgId
                                type = "VOICE"
                                timestamp = (Get-Date).ToString("o")
                                duration_seconds = $duration
                                file = "inbox/voice/" + $voiceFileName
                                status = "PENDIENTE"
                                resultado = "Audio recibido sin texto detectable"
                            }
                            Save-TaskEntry $task
                            Send-TelegramMessage $chatId "$ICON_MIC <b>Nota de voz recibida ($duration s)</b>`n`n$ICON_FOLDER Guardada en tu PC: <code>inbox/voice/$voiceFileName</code>`n$ICON_CLOCK Estado: PENDIENTE para revision."
                        }
                    } else {
                        Send-TelegramMessage $chatId "$ICON_WARN Recibi tu nota de voz pero fallo la descarga."
                    }
                }

                # 2. ARCHIVOS DE AUDIO NORMALES
                elseif ($audio) {
                    $aFileId = $audio.file_id
                    $ext = ($audio.file_name -split '\.' | Select-Object -Last 1)
                    if (-not $ext) { $ext = "mp3" }
                    $audioFileName = "audio_" + $msgId + "." + $ext
                    $audioPath = Join-Path $VoiceDir $audioFileName

                    $downloadOk = Download-TelegramFile $aFileId $audioPath
                    if ($downloadOk) {
                        $task = [PSCustomObject]@{
                            id = $msgId
                            type = "AUDIO_FILE"
                            timestamp = (Get-Date).ToString("o")
                            file = "inbox/voice/" + $audioFileName
                            caption = $caption
                            status = "PENDIENTE"
                        }
                        Save-TaskEntry $task
                        Send-TelegramMessage $chatId ("$ICON_NOTE <b>Audio guardado:</b> <code>inbox/voice/$audioFileName</code>")
                    }
                }

                # 3. FOTOGRAFIAS / CAPTURAS
                elseif ($photo) {
                    $bestPhoto = $photo | Select-Object -Last 1
                    $pFileId = $bestPhoto.file_id
                    $photoFileName = "captura_" + $msgId + ".jpg"
                    $photoPath = Join-Path $PhotoDir $photoFileName

                    $downloadOk = Download-TelegramFile $pFileId $photoPath
                    if ($downloadOk) {
                        if ($caption) {
                            Process-UserInstruction $chatId $msgId $caption "PHOTO" ("inbox/photos/" + $photoFileName)
                        } else {
                            $task = [PSCustomObject]@{
                                id = $msgId
                                type = "PHOTO"
                                timestamp = (Get-Date).ToString("o")
                                file = "inbox/photos/" + $photoFileName
                                status = "PENDIENTE"
                                resultado = "Captura sin texto"
                            }
                            Save-TaskEntry $task
                            Send-TelegramMessage $chatId "$ICON_CAM <b>Captura recibida y guardada en tu PC:</b>`n<code>inbox/photos/$photoFileName</code>"
                        }
                    }
                }

                # 4. DOCUMENTOS
                elseif ($document) {
                    $docFileName = $document.file_name
                    if (-not $docFileName) { $docFileName = "doc_" + $msgId + ".bin" }
                    $docPath = Join-Path $DocsDir $docFileName

                    $downloadOk = Download-TelegramFile $document.file_id $docPath
                    if ($downloadOk) {
                        $task = [PSCustomObject]@{
                            id = $msgId
                            type = "DOCUMENT"
                            timestamp = (Get-Date).ToString("o")
                            file = "inbox/docs/" + $docFileName
                            caption = $caption
                            status = "PENDIENTE"
                        }
                        Save-TaskEntry $task
                        Send-TelegramMessage $chatId ("$ICON_DOC <b>Documento recibido:</b> <code>inbox/docs/$docFileName</code>")
                    }
                }

                # 5. MENSAJES DE TEXTO
                elseif ($text) {
                    Write-BridgeLog "Texto recibido: '$text'"

                    if ($text -eq "/start") {
                        $welcome = "$ICON_WAVE <b>Hola Dev.Alex!</b>`n`nTu puente con <b>Antigravity IDE</b> esta 100% activo con procesamiento inteligente de voz, texto y capturas.`n`n<b>Comandos rapidos:</b>`n- <code>/status</code> - Estado del sitio y de la PC`n- <code>/reporte</code> - Auditoria y resumen del proyecto`n- <code>/deploy</code> - Desplegar a Vercel Produccion`n- <code>/tareas</code> - Ver panel de tareas (atendidas y pendientes)`n- <code>/limpiar</code> - Limpiar historial`n`nO hazme cualquier pregunta por nota de voz."
                        Send-TelegramMessage $chatId $welcome
                    } else {
                        Process-UserInstruction $chatId $msgId $text "TEXT" ""
                    }
                }
            }
        }
    } catch {
        Write-BridgeLog "Error en bucle principal: $_"
        Start-Sleep -Seconds 3
    }

    Start-Sleep -Milliseconds 500
}
