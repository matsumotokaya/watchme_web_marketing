import { NextResponse } from 'next/server';
import { EMAIL_PATTERN, notifySupport, text } from '@/lib/mail';

// Early access requests from the top page form.
// Saved to Supabase (public.early_access_requests, insert-only for anon), then
// announced by email through Resend. The request is saved even if the email fails.

const GENDERS = ['male', 'female', 'other'];

type EarlyAccessRequest = {
  name: string;
  email: string;
  gender: string | null;
  age: number | null;
  comment: string | null;
};

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

  await notifySupport(`【WatchMe】アーリーアクセス申し込み: ${request.name}`, lines.join('\n'), request.email);
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
