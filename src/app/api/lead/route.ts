import { NextResponse } from 'next/server';

// Receives the "Páginas web" demo form and forwards it to a GoHighLevel
// Inbound Webhook (workflow trigger). The webhook URL lives only on the server
// (GHL_LEAD_WEBHOOK_URL) so it is never exposed in the browser bundle.

const MAX = { name: 120, email: 160, phone: 30, message: 2000 };

function clean(v: unknown, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

// 10-digit Mexican numbers become +52XXXXXXXXXX; anything else keeps its digits.
function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return `+52${digits}`;
  if (digits.length === 12 && digits.startsWith('52')) return `+${digits}`;
  if (digits.length === 13 && digits.startsWith('521')) return `+52${digits.slice(3)}`;
  return digits ? `+${digits}` : '';
}

export async function POST(request: Request) {
  const webhook = process.env.GHL_LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error('[lead] GHL_LEAD_WEBHOOK_URL is not set');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field. Pretend success to bots.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email).toLowerCase();
  const phone = normalizePhone(clean(body.phone, MAX.phone));
  const message = clean(body.message, MAX.message);
  const source = clean(body.source, 80) || 'web';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'invalid';
  if (phone.replace(/\D/g, '').length < 10) errors.phone = 'invalid';
  if (message.length < 10) errors.message = 'too_short';
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: 'validation', fields: errors }, { status: 422 });
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const payload = {
    name,
    first_name: firstName,
    last_name: rest.join(' '),
    email,
    phone,
    message,
    source,
    page: clean(body.page, 300),
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('[lead] GHL webhook responded', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    }
  } catch (err) {
    console.error('[lead] GHL webhook request failed', err);
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
