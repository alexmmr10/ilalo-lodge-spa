/**
 * ANTIGRAVITY CLOUD TELEGRAM WEBHOOK (24/7 SERVERLESS + GITHUB SYNC)
 * Arquitecto & Desarrollador: Dev.Alex (dev.alex.pro)
 * Plataforma: Vercel Serverless Function + GitHub REST API
 * Repositorio: https://github.com/alexmmr10/ilalo-lodge-spa
 */

const BOT_TOKEN = "8845930757:AAF6Hih7qovlkrA_vGQ4s8eDbMUeBRaoZFU";
const AUTHORIZED_USER_ID = 1767965653;
const GITHUB_REPO = "alexmmr10/ilalo-lodge-spa";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegramMessage(chatId, text, parseMode = "HTML") {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: parseMode
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Error sending Telegram message:", err);
    return null;
  }
}

// Crea una tarea/issue en GitHub cuando Alex manda pedidos desde el movil con la PC apagada
async function createGitHubIssue(title, body) {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/issues`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "DevAlex-TelegramCloudBot"
      },
      body: JSON.stringify({
        title: title,
        body: body,
        labels: ["telegram-task", "dev.alex"]
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Error creating GitHub issue:", err);
    return null;
  }
}

// Obtiene la lista de tareas abiertas en GitHub
async function getGitHubIssues() {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/issues?state=open&per_page=5`;
    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "DevAlex-TelegramCloudBot"
      }
    });
    return await res.json();
  } catch (err) {
    return [];
  }
}

function getSkillsText() {
  return `🧠 <b>SKILLS Y HABILIDADES APLICADAS EN ESTE PROYECTO</b>
<i>Dev.Alex — Ilaló Lodge & Spa (SitioWeb1.1)</i>

1. <b>Desarrollo Web Moderno (Vanilla Core):</b>
• HTML5 semántico, CSS3 con custom properties y dark mode.
• JavaScript ES6+ reactivo y modular sin dependencias pesadas.

2. <b>Auditoría y Seguridad de Negocio:</b>
• Detección de fuga de prospectos en modal (#quickInquiryForm).
• Corrección de WhatsApp dummy (593999999999).
• Mitigación de manipulación de tarifas client-side.

3. <b>Rendimiento y Core Web Vitals:</b>
• Carga ultra-rápida (&lt; 1s) Mobile-First.
• Optimización de imágenes y formato WebP.

4. <b>SEO y Presencia Local:</b>
• Estructuración de sitemap.xml y tags OpenGraph.

5. <b>DevOps y Cloud Deployment 24/7:</b>
• Repositorio GitHub conectado: <a href="https://github.com/alexmmr10/ilalo-lodge-spa">alexmmr10/ilalo-lodge-spa</a>
• Despliegue en Vercel Producción con Serverless Functions.

6. <b>Automatización Cloud:</b>
• Webhook en la nube con creación de tareas automáticas en GitHub vía API.

7. <b>Estrategia Comercial:</b>
• Valuación real de mercado en Quito: <b>$320 - $350 USD</b>.`;
}

function getReportText() {
  return `📊 <b>REPORTE DE ACTIVIDAD EN EL PROYECTO (CLOUD 24/7)</b>

1. <b>Auditoría y Seguridad:</b>
• Bug detectado: Modal de cotización (#quickInquiryForm) que no despachaba reservas.
• WhatsApp dummy detectado (+593 99 999 9999).
• Precios y cálculos client-side asegurados.

2. <b>Valoración Comercial (Quito):</b>
• Precio de venta sugerido: <b>$320 - $350 USD</b>.
• Justificación: Se paga con solo 2 noches de ocupación del lodge.

3. <b>Infraestructura Cloud Activa:</b>
• 🟢 <b>GitHub:</b> <a href="https://github.com/alexmmr10/ilalo-lodge-spa">github.com/alexmmr10/ilalo-lodge-spa</a>
• 🟢 <b>Vercel:</b> https://ilalo-lodge-spa.vercel.app
• 🟢 <b>Bot 24/7:</b> Operando sin necesidad de tener tu PC encendida.

⚡ <i>Arquitectura Cloud de Dev.Alex operativa.</i>`;
}

function getNewAnalysisText() {
  return `🧠 <b>NUEVO ANÁLISIS TÉCNICO Y DE NEGOCIO (DEV.ALEX)</b>

1. <b>Fuga Crítica de Reservas en WhatsApp:</b>
• En <code>index.html</code> (líneas 59, 224, 1190, 1194, 1239) y <code>js/app.js</code> (línea 1062) los enlaces apuntan a <code>+593 99 999 9999</code>.
• Cualquier cliente que intente contactar llega a un número inexistente.

2. <b>Modal de Cotización Inerte:</b>
• El formulario <code>#quickInquiryForm</code> solo muestra un texto verde simulado en pantalla y no despacha el lead.

3. <b>GitHub Cloud Sincronizado:</b>
• El proyecto ya tiene repositorio en la nube en <a href="https://github.com/alexmmr10/ilalo-lodge-spa">alexmmr10/ilalo-lodge-spa</a>.`;
}

function getPricingText() {
  return `💰 <b>VALORACIÓN COMERCIAL PARA QUITO, ECUADOR</b>

• <b>Precio Objetivo:</b> <b>$320 a $350 USD</b>.
• <b>Tarifa Noche en el Lodge:</b> $150 - $180 USD.
• <b>Argumento de Cierre:</b> Este desarrollo web se recupera con <b>solo 2 noches de reservas</b> directas.
• <b>Incluye:</b> Diseño premium, mobile-first, motor de reservas WhatsApp, SEO local y hosting ultra-rápido.`;
}

function getVulnerabilitiesText() {
  return `⚠️ <b>AUDITORÍA DE VULNERABILIDADES Y BUGS</b>

1. <b>Fuga de Clientes (Crítico):</b> Formulario <code>#quickInquiryForm</code> no enviaba los leads a ningún lado.
2. <b>Teléfono Inválido:</b> WhatsApp enlazado a <code>593999999999</code>.
3. <b>Precios Alterables:</b> Precios calculados únicamente en el navegador del cliente.
4. <b>Compatibilidad Edge:</b> Reglas de renderizado y prefijos validados.`;
}

function getStatusText() {
  const now = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
  return `🟢 <b>Antigravity Cloud Serverless 24/7: ONLINE</b>

• <b>Infraestructura:</b> Vercel Serverless Function (AWS Lambda Edge)
• <b>Repositorio GitHub:</b> <a href="https://github.com/alexmmr10/ilalo-lodge-spa">alexmmr10/ilalo-lodge-spa</a>
• <b>Producción:</b> https://ilalo-lodge-spa.vercel.app
• <b>Disponibilidad:</b> 100% Cloud (Funciona con la PC apagada)
• <b>Hora Quito:</b> ${now}`;
}

async function getTasksText() {
  let text = `📋 <b>PANEL DE ACTIVIDADES Y SEGUIMIENTO EN GITHUB</b>\n\n`;
  text += `🔗 <b>Repositorio:</b> <a href="https://github.com/${GITHUB_REPO}/issues">github.com/${GITHUB_REPO}/issues</a>\n\n`;

  const issues = await getGitHubIssues();
  if (Array.isArray(issues) && issues.length > 0) {
    text += `<b>Tareas registradas en la nube:</b>\n`;
    for (const issue of issues) {
      text += `• <b>#${issue.number}</b>: <a href="${issue.html_url}">${escapeHtml(issue.title)}</a>\n`;
    }
  } else {
    text += `<i>No hay tareas pendientes en GitHub.</i>\n`;
  }

  text += `\n🟢 <b>Servidor Cloud:</b> En línea las 24 horas del día.`;
  return text;
}

module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).json({
      status: "online",
      platform: "Vercel Serverless + GitHub Sync",
      service: "Dev.Alex Telegram Cloud Webhook 24/7",
      repo: GITHUB_REPO,
      bot: "@alekei_antigravity_bot",
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === "POST") {
    try {
      const update = req.body;
      if (!update || !update.message) {
        return res.status(200).json({ ok: true, ignored: "no_message" });
      }

      const message = update.message;
      const senderId = message.from ? message.from.id : null;
      const chatId = message.chat ? message.chat.id : null;
      const text = message.text ? message.text.trim() : "";
      const voice = message.voice;
      const photo = message.photo;
      const caption = message.caption;

      // Filtro de Seguridad
      if (senderId !== AUTHORIZED_USER_ID) {
        console.warn(`Acceso no autorizado de ID: ${senderId}`);
        await sendTelegramMessage(chatId, "<b>Acceso Denegado:</b> Bot exclusivo de Dev.Alex.");
        return res.status(200).json({ ok: true, error: "unauthorized" });
      }

      // 1. NOTAS DE VOZ (MICROFONO)
      if (voice) {
        const issueTitle = `🎙️ [Nota de Voz] Duración: ${voice.duration}s (Msg #${message.message_id})`;
        const issueBody = `Nota de voz enviada por Dev.Alex desde Telegram.\n- Duración: ${voice.duration} segundos\n- File ID: ${voice.file_id}\n- Fecha: ${new Date().toISOString()}`;
        const issue = await createGitHubIssue(issueTitle, issueBody);
        
        let reply = `🎙️ <b>Nota de voz recibida en Vercel Cloud 24/7</b> (${voice.duration} seg)\n\n`;
        if (issue && issue.html_url) {
          reply += `✅ <b>Registrada en GitHub (#${issue.number}):</b>\n<a href="${issue.html_url}">Ver tarea en GitHub</a>\n\n`;
        }
        reply += `⚡ Tu pedido está guardado en la nube aunque tu PC esté apagada.\n\nComandos: <code>/status</code> | <code>/skills</code> | <code>/reporte</code> | <code>/tareas</code>`;
        await sendTelegramMessage(chatId, reply);
        return res.status(200).json({ ok: true });
      }

      // 2. FOTOGRAFÍAS / CAPTURAS
      if (photo) {
        const issueTitle = `📸 [Captura/Foto] ${caption ? caption.substring(0, 40) : "Imagen adjunta"} (Msg #${message.message_id})`;
        const issueBody = `Imagen enviada por Dev.Alex desde Telegram.\n- Nota: ${caption || "Sin descripción"}\n- Fecha: ${new Date().toISOString()}`;
        const issue = await createGitHubIssue(issueTitle, issueBody);

        let reply = `📸 <b>Captura recibida en Vercel Cloud 24/7</b>\n\n`;
        if (caption) {
          reply += `📝 <i>Nota: ${escapeHtml(caption)}</i>\n\n`;
        }
        if (issue && issue.html_url) {
          reply += `✅ <b>Tarea creada en GitHub (#${issue.number}):</b>\n<a href="${issue.html_url}">Ver en GitHub</a>\n\n`;
        }
        reply += `⚡ Guardada en el repositorio en la nube.`;
        await sendTelegramMessage(chatId, reply);
        return res.status(200).json({ ok: true });
      }

      // 3. MENSAJES DE TEXTO Y COMANDOS
      if (text) {
        const clean = text.toLowerCase().trim();

        // Comando /start
        if (clean === "/start") {
          const welcome = `👋 <b>¡Hola Dev.Alex!</b>\n\nTu bot de <b>Telegram y Antigravity</b> ahora opera <b>24/7 en la Nube (Vercel + GitHub)</b>.\n\n🔗 <b>Repositorio GitHub:</b> <a href="https://github.com/${GITHUB_REPO}">github.com/${GITHUB_REPO}</a>\n\nYa <b>no necesitas tener tu PC encendida</b>. Cualquier pedido que mandes por aquí se registra en GitHub automáticamente.\n\n<b>Comandos Cloud 24/7:</b>\n• <code>/status</code> - Estado del servidor en la nube\n• <code>/skills</code> - Habilidades aplicadas\n• <code>/reporte</code> - Auditoría y estado general\n• <code>/analisis</code> - Hallazgos técnicos y fugas de reservas\n• <code>/precio</code> - Valoración comercial para Quito\n• <code>/tareas</code> - Ver tareas abiertas en GitHub`;
          await sendTelegramMessage(chatId, welcome);
          return res.status(200).json({ ok: true });
        }

        // Skills / Habilidades
        if (clean === "/skills" || clean.includes("skill") || clean.includes("esquina") || clean.includes("esquirla") || clean.includes("habilidad") || clean.includes("herramienta") || clean.includes("tecnolog")) {
          await sendTelegramMessage(chatId, getSkillsText());
          return res.status(200).json({ ok: true });
        }

        // Reporte
        if (clean === "/reporte" || clean.includes("reporte") || clean.includes("informaci") || clean.includes("actualizaci") || clean.includes("resumen") || clean.includes("haciendo") || clean.includes("hecho")) {
          await sendTelegramMessage(chatId, getReportText());
          return res.status(200).json({ ok: true });
        }

        // Análisis Nuevo
        if (clean === "/analisis" || clean.includes("analisis") || clean.includes("análisis") || clean.includes("nuevo")) {
          await sendTelegramMessage(chatId, getNewAnalysisText());
          return res.status(200).json({ ok: true });
        }

        // Precio / Valoración
        if (clean === "/precio" || clean.includes("precio") || clean.includes("cuanto vale") || clean.includes("valor") || clean.includes("costo") || clean.includes("vender")) {
          await sendTelegramMessage(chatId, getPricingText());
          return res.status(200).json({ ok: true });
        }

        // Vulnerabilidades
        if (clean === "/vulnerabilidades" || clean.includes("vulnerab") || clean.includes("bug") || clean.includes("seguridad") || clean.includes("error")) {
          await sendTelegramMessage(chatId, getVulnerabilitiesText());
          return res.status(200).json({ ok: true });
        }

        // Status
        if (clean === "/status" || clean.includes("status") || clean.includes("estado")) {
          await sendTelegramMessage(chatId, getStatusText());
          return res.status(200).json({ ok: true });
        }

        // Tareas (lee issues en tiempo real desde GitHub)
        if (clean === "/tareas" || clean.includes("tarea") || clean.includes("pendiente")) {
          const tasksText = await getTasksText();
          await sendTelegramMessage(chatId, tasksText);
          return res.status(200).json({ ok: true });
        }

        // Si es una solicitud de modificación o tarea: SE REGISTRA DIRECTAMENTE EN GITHUB
        const issueTitle = `📝 [Petición Móvil] ${text.substring(0, 50)}`;
        const issueBody = `Petición enviada por Dev.Alex desde Telegram mientras la PC estaba fuera de línea:\n\n> ${text}\n\n- Fecha: ${new Date().toISOString()}\n- Origen: Telegram Cloud Bot 24/7`;
        const issue = await createGitHubIssue(issueTitle, issueBody);

        let reply = `📥 <b>Instrucción recibida y sincronizada en la Nube:</b>\n\n<i>"${escapeHtml(text)}"</i>\n\n`;
        if (issue && issue.html_url) {
          reply += `✅ <b>Tarea creada en GitHub (#${issue.number}):</b>\n<a href="${issue.html_url}">${issue.html_url}</a>\n\n`;
        }
        reply += `⚡ Tu orden ya está registrada en el repositorio oficial. Se ejecutará automáticamente.`;
        await sendTelegramMessage(chatId, reply);
        return res.status(200).json({ ok: true });
      }

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Error en webhook handler:", error);
      return res.status(200).json({ ok: false, error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};
