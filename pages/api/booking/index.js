export default async function handler(req, res) {
  const allowedMethods = ['POST', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).end();
    return;
  }
  const pickSlug = (body, query) => {
    // Highest priority: explicit query ?service=<slug>
    const q = (query?.service || '').toString().trim().toLowerCase();
    if (q) return q;
    // Next: internal serviceKey
    const key = (body?.serviceKey || '').toString().trim().toLowerCase();
    if (key === 'health') return 'health-appointment';
    if (key === 'dialysis') return 'dialysis';
    if (key === 'customactivities') return 'custom-activities';
    if (key === 'homepackage') return 'at-home';
    // Next: human label serviceType
    const label = (body?.serviceType || '').toString().trim().toLowerCase();
    if (label.includes('health')) return 'health-appointment';
    if (label.includes('dialysis')) return 'dialysis';
    if (label.includes('custom')) return 'custom-activities';
    if (label.includes('home')) return 'at-home';
    return ''; // fallback: base
  };
  const slug = pickSlug(req.body || {}, req.query || {});
  const base = 'https://n8n-0faudat1jwfn.ciluba.sumopod.my.id/webhook/booking';
  const url = slug ? `${base}/${slug}` : base;
  try {
    // Ensure returnAddress fallback for health & dialysis if empty
    const body = { ...(req.body || {}) };
    if ((slug === 'health-appointment' || slug === 'dialysis')) {
      const r = body.returnAddress || body.return_address;
      const p = body.pickupAddress || body.pickup_address;
      if ((!r || String(r).trim() === '') && p) {
        body.returnAddress = p;
        body.return_address = p;
      }
    }
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
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
