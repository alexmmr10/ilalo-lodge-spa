const fs = require('fs');

const BOT_TOKEN = '8845930757:AAF6Hih7qovlkrA_vGQ4s8eDbMUeBRaoZFU';
const CHAT_ID = 1767965653;
const filePath = 'c:/Users/alexm/Proyectos/SitioWeb1.1/assets/images/whatsapp_business_mockup.jpg';

async function send() {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  const form = new FormData();
  form.append('chat_id', CHAT_ID);
  form.append('caption', '📱 <b>Diseño Oficial de WhatsApp Business</b>\n<i>ILALÓ Glamping & Spa</i>\n\n🌿 Incluye información comercial, logo, dirección, horarios, web y catálogo.');
  form.append('parse_mode', 'HTML');
  form.append('photo', blob, 'whatsapp_business_mockup.jpg');

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: 'POST',
    body: form
  });
  const data = await res.json();
  console.log('Result:', data.ok ? 'SUCCESS' : data);
}

send();
