'use client';

import { useState } from 'react';

const EMPTY = { name: '', email: '', message: '', website: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      setIsSent(true);
      setFormData(EMPTY);
    } catch {
      setSubmitError('送信できませんでした。時間をおいてもう一度お試しいただくか、support@hey-watch.me までメールでご連絡ください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <p className="policy-intro" role="status">
        お問い合わせありがとうございます。内容を確認のうえ、ご入力いただいたメールアドレスにご返信します。
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">お名前 *</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required maxLength={100} className="form-input" />
      </div>

      <div className="form-group">
        <label htmlFor="email">メールアドレス *</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
      </div>

      <div className="form-group">
        <label htmlFor="message">お問い合わせ内容 *</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required maxLength={5000} rows={8} className="form-input form-textarea" />
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-note">
        ご入力いただいた情報は、お問い合わせへの回答のためだけに使います。取り扱いは<a href="/privacy/">プライバシーポリシー</a>をご覧ください。
      </p>

      {submitError && (
        <p className="form-error" role="alert">{submitError}</p>
      )}

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中…' : '送信'}
      </button>
    </form>
  );
}
