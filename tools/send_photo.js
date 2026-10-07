const fs = require('fs');

const BOT_TOKEN = '8845930757:AAF6Hih7qovlkrA_vGQ4s8eDbMUeBRaoZFU';
const CHAT_ID = 1767965653;
const filePath = 'c:/Users/alexm/Proyectos/SitioWeb1.1/assets/images/tulipe_love_glamping_mockup.jpg';

async function send() {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  const form = new FormData();
  form.append('chat_id', CHAT_ID);
  form.append('caption', '📱 <b>Diseño Oficial de WhatsApp Business (Mockup Final)</b>\n<i>Tulipe Love Glamping</i>\n\n🌿 Replicado con fidelidad 100% sobre smartphone 3D en mesa de madera rústica.\n📞 +593 97 977 4581\n📍 Quito, Ecuador (a 1h y 45min)\n✨ Desarrollado con <b>diseño_mockup</b> por <b>Dev.Alex</b> (dev.alex.pro)');
  form.append('parse_mode', 'HTML');
  form.append('photo', blob, 'tulipe_love_glamping_mockup.jpg');

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
    method: 'POST',
    body: form
  });
  const data = await res.json();
  console.log('Result:', data.ok ? 'SUCCESS' : data);
}

send();
