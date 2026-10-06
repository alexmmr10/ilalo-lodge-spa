$msg = @"
🤖 <b>¡ATENCIÓN DEV.ALEX! Solicitud atendida y sincronizada:</b>

<b>1. Tu nota de voz fue escuchada y transcrita:</b>
🎙️ <i>"necesito información de cuanto antes a todo este proyecto que estamos haciendo"</i>

<b>2. Tu captura fue revisada:</b>
📸 Vimos la captura de pantalla donde <code>/tareas</code> te mostraba el JSON crudo en estado <code>PENDING</code>.

<b>3. Correcciones aplicadas en tu PC:</b>
• <b>Auto-transcripción activa:</b> Cada nota de voz que envíes se transcribe y procesa localmente con el motor en español.
• <b>Respuestas inmediatas:</b> Si preguntas por voz o texto 'información', 'reporte', 'deploy' o 'status', el bot te responde al instante.
• <b>Nuevo panel visual:</b> Escribe ahora <code>/tareas</code> para ver tu nuevo panel con las tareas atendidas y el progreso del proyecto.

⚡ <i>Prueba escribir /tareas o mandar un nuevo audio desde tu móvil.</i>
"@

& "$PSScriptRoot/send_telegram.ps1" -Message $msg
