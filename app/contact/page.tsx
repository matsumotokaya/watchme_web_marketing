import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'お問い合わせ - WatchMe',
};

export default function ContactPage() {
  return (
    <main className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>お問い合わせ</h1>
        </div>

        <p className="policy-intro">
          WatchMe に関するご質問・ご相談は、下のフォームからお送りください。内容を確認のうえ、ご入力いただいたメールアドレスにご返信します。メールでのご連絡は support@hey-watch.me でも受け付けています。
        </p>

        <ContactForm />
      </div>
    </main>
  );
}
