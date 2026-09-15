const HOSTED_BUTTON_ID = 'ECHV6MUE2CBYE';

export default function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method || 'GET')) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }

  const destination = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${encodeURIComponent(HOSTED_BUTTON_ID)}`;

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return res.redirect(302, destination);
}
