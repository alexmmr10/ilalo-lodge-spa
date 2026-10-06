$msg = @"
🧠 <b>NUEVO ANÁLISIS TÉCNICO Y DE NEGOCIO (DEV.ALEX)</b>
<i>Proyecto: Ilaló Lodge & Spa (SitioWeb1.1)</i>

Hola Alex, atendiendo tu consulta <b>'¿Algún análisis nuevo?'</b>, aquí tienes los hallazgos críticos detectados en el código:

1. <b>Fuga Total de WhatsApp (Crítico):</b>
• En <code>index.html</code> (líneas 59, 224, 1190, 1194, 1239) y en <code>js/app.js</code> (línea 1062), los botones de reserva están enlazados al número ficticio <code>+593 99 999 9999</code>.
• Cualquier cliente real que hace clic para reservar o cotizar desde su celular llega a un número inexistente y se pierde la venta.

2. <b>El Modal de Consulta (#quickInquiryForm) está inerte:</b>
• Al llenar nombre y correo, el script solo muestra un texto verde simulado en pantalla y se cierra a los 4 segundos.
• No despacha correo, no abre WhatsApp ni guarda el lead en ningún lado.
• Solución: Conectarlo para que abra WhatsApp con el mensaje pre-llenado del huésped.

3. <b>Sobre tu duda de funcionamiento del Bot:</b>
• El puente actual corre en tu PC local (Windows). Si tu laptop entra en suspensión o se apaga, el bot queda en pausa hasta que la enciendas de nuevo.
• Si deseas que el bot responda 24/7 sin que tu PC esté encendida, podemos migrar el webhook a Vercel Serverless o n8n Cloud con la API de Gemini.

⚡ <i>¿Deseas que corrijamos el número de WhatsApp oficial en todo el sitio web ahora mismo?</i>
"@

& "$PSScriptRoot/send_telegram.ps1" -Message $msg
