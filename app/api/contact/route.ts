import { NextResponse } from 'next/server';
import { EMAIL_PATTERN, notifySupport, text } from '@/lib/mail';

// Contact form (/contact). The message is emailed to the support inbox with the
// sender as reply-to; nothing is stored. If the email fails, the form shows an
// error with the support address so the message is not silently lost.

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field.
  if (text(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(body.name, 100);
  const email = text(body.email, 254);
  const message = text(body.message, 5000);
  if (!name || !email || !EMAIL_PATTERN.test(email) || !message) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const lines = [
    'hey-watch.me のお問い合わせフォームから連絡がありました。',
    '',
    `お名前: ${name}`,
    `メールアドレス: ${email}`,
    '',
    'お問い合わせ内容:',
    message,
  ];

  try {
    await notifySupport(`【WatchMe】お問い合わせ: ${name}`, lines.join('\n'), email);
  } catch (error) {
    console.error('contact: notify failed', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
