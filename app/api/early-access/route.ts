import { NextResponse } from 'next/server';

// Early access requests from the top page form.
// Saved to Supabase (public.early_access_requests, insert-only for anon), then
// announced by email through Resend. The request is saved even if the email fails.

const NOTIFY_TO = 'support@hey-watch.me';
const NOTIFY_FROM = 'WatchMe <noreply@hey-watch.me>';
const GENDERS = ['male', 'female', 'other'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EarlyAccessRequest = {
  name: string;
  email: string;
  gender: string | null;
  age: number | null;
  comment: string | null;
};

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function parse(body: Record<string, unknown>): EarlyAccessRequest | null {
  const name = text(body.name, 100);
  const email = text(body.email, 254);
  if (!name || !email || !EMAIL_PATTERN.test(email)) return null;

  const gender = text(body.gender, 10);
  const ageText = text(body.age, 3);
  const age = ageText === null ? null : Number(ageText);

  return {
    name,
    email,
    gender: gender && GENDERS.includes(gender) ? gender : null,
    age: age !== null && Number.isInteger(age) && age >= 0 && age <= 150 ? age : null,
    comment: text(body.comment, 2000),
  };
}

async function save(request: EarlyAccessRequest): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is not set');

  const response = await fetch(`${url}/rest/v1/early_access_requests`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ ...request, source: 'website' }),
  });
  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status} ${await response.text()}`);
  }
}

const GENDER_LABELS: Record<string, string> = { male: '男性', female: '女性', other: 'その他' };

async function notify(request: EarlyAccessRequest): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');

  const lines = [
    'hey-watch.me からアーリーアクセスの申し込みがありました。',
    '',
    `お名前: ${request.name}`,
    `メールアドレス: ${request.email}`,
    `性別: ${request.gender ? GENDER_LABELS[request.gender] : '-'}`,
    `年齢: ${request.age ?? '-'}`,
    '',
    'コメント:',
    request.comment ?? '-',
  ];

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: request.email,
      subject: `【WatchMe】アーリーアクセス申し込み: ${request.name}`,
      text: lines.join('\n'),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
  }
}

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

  const request = parse(body);
  if (!request) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  try {
    await save(request);
  } catch (error) {
    console.error('early-access: save failed', error);
    return NextResponse.json({ error: 'save_failed' }, { status: 500 });
  }

  try {
    await notify(request);
  } catch (error) {
    console.error('early-access: notify failed (request was saved)', error);
  }

  return NextResponse.json({ ok: true });
}
