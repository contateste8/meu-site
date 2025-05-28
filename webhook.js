export default async function handler(req, res) {
  if (req.method === 'POST') {
    const webhookUrl = 'https://discord.com/api/webhooks/1377330816664731709/bl_oh9S8js6rhNgBNMmqSplQc7f__4dde322QGU-qSnq-VzQVvjQ_JwRjwDDQX2SDa6I';

    const userIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Desconhecido';
    const userAgent = req.headers['user-agent'] || 'Desconhecido';

    const data = {
      embeds: [{
        title: 'Alguém acessou seu site!',
        color: 16753920,
        fields: [
          { name: 'IP', value: `\`${userIP}\``, inline: false },
          { name: 'User-Agent', value: `\`${userAgent}\``, inline: false },
          { name: 'Data/Hora', value: new Date().toISOString(), inline: false }
        ]
      }]
    };

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    res.status(200).json({ status: 'ok' });
  } else {
    res.status(405).end('Método não permitido');
  }
}