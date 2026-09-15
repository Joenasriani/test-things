const LEGACY = Buffer.from(
  'aHR0cHM6Ly93d3cucGF5cGFsLmNvbS9jZ2ktYmluL3dlYnNjcj9jbWQ9X3hjbGljayZidXNpbmVzcz1qb2VuYXNyJTQwZ21haWwuY29tJml0ZW1fbmFtZT1NYW5pcHVsYXRpb24lMjAlRTIlODAlOTQlMjBUaGUlMjBGb29sJTIwYW5kJTIwdGhlJTIwV2lzZSUyMCVFMiU4MCU5NCUyMENvbXBsZXRlJTIwQ29sbGVjdGlvbiZhbW91bnQ9MjMuMzMmY3VycmVuY3lfY29kZT1VU0Qmbm9fc2hpcHBpbmc9MQ==',
  'base64'
).toString('utf8');

export default function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  const hostedId = String(process.env.PAYPAL_HOSTED_BUTTON_ID || '').trim();
  const destination = hostedId
    ? `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${encodeURIComponent(hostedId)}`
    : LEGACY;

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.redirect(302, destination);
}
