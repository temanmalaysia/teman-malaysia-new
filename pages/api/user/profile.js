export default async function handler(req, res) {
  const allowedMethods = ['PATCH', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }
  const url = 'https://n8n-0faudat1jwfn.ciluba.sumopod.my.id/webhook/user/profile';
  try {
    const resp = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization || '',
      },
      body: JSON.stringify(req.body || {}),
    });
    const text = await resp.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(resp.status).json(data);
  } catch {
    res.status(500).json({ error: 'Upstream error' });
  }
}
