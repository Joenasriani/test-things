const MEDIA = {
  cover: { file: 'cover.jpg', type: 'image/jpeg' },
  scene: { file: 'collection-scene.webp', type: 'image/webp' },
  font: { file: 'fonts/manrope.ttf', type: 'font/ttf' }
};

const ORIGIN = Buffer.from(
  'aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0pvZW5hc3JpYW5pL3Rlc3QtdGhpbmdzL21haW4vYXNzZXRzLw==',
  'base64'
).toString('utf8');

export default async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  const key = Array.isArray(req.query.asset) ? req.query.asset[0] : req.query.asset;
  const asset = MEDIA[key];
  if (!asset) return res.status(404).end();

  try {
    const upstream = await fetch(ORIGIN + asset.file, {
      headers: { 'User-Agent': 'Reasoning-Library-Media/1.0' }
    });
    if (!upstream.ok) return res.status(502).end();

    res.setHeader('Content-Type', asset.type);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    if (key === 'font') res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'HEAD') return res.status(200).end();
    const body = Buffer.from(await upstream.arrayBuffer());
    return res.status(200).send(body);
  } catch {
    return res.status(502).end();
  }
}
