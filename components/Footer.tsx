import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="/images/logo_watchme_001.svg"
                alt="WatchMe Logo"
                className="footer-logo-image"
                width={150}
                height={50}
              />
            </div>
            <p>音声×AIで「こころ」がわかる</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>製品</h4>
              <Link href="/#features">製品概要</Link>
            </div>
            <div className="link-group">
              <h4>企業</h4>
              <Link href="/company/">会社概要</Link>
              <Link href="/privacy/">プライバシーポリシー</Link>
              <Link href="/terms/">利用規約</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>WatchMe</p>
        </div>
      </div>
    </footer>
  );
}
