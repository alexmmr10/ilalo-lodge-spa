param (
    [Parameter(Mandatory=$true)]
    [string]$Message,
    [string]$BotToken = "8845930757:AAF6Hih7qovlkrA_vGQ4s8eDbMUeBRaoZFU",
    [int64]$ChatId = 1767965653
)

try {
    $uri = "https://api.telegram.org/bot" + $BotToken + "/sendMessage"
    $bodyObj = @{
        chat_id = $ChatId
        text = $Message
        parse_mode = "HTML"
    }
    $json = $bodyObj | ConvertTo-Json -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)

    $res = Invoke-RestMethod -Uri $uri -Method Post -Body $bytes -ContentType "application/json; charset=utf-8" -TimeoutSec 15
    Write-Host "Mensaje enviado a Telegram con exito." -ForegroundColor Green
    return $res
} catch {
    Write-Host "Error enviando a Telegram: $_" -ForegroundColor Red
    return $null
}
