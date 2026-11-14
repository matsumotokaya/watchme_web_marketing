// Shared helpers for the website forms (early access, contact).
// Mail is sent through Resend from the hey-watch.me domain to the support inbox.

export const SUPPORT_ADDRESS = 'support@hey-watch.me';
const FROM_ADDRESS = 'WatchMe <noreply@hey-watch.me>';
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function notifySupport(subject: string, body: string, replyTo: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [SUPPORT_ADDRESS],
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend failed: ${response.status} ${await response.text()}`);
  }
}
