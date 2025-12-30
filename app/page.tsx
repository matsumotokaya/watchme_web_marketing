import Image from 'next/image';
import HeroParallax from '@/components/HeroParallax';

export default function Home() {
  return (
    <main>
      <HeroParallax />
      {/* Hero Section */}
      <section className="hero">
        {/* Background Color Layers */}
        <div className="hero-bg-layers">
          <div className="hero-bg-layer hero-bg-blue"></div>
          <div className="hero-bg-layer hero-bg-green"></div>
          <div className="hero-bg-layer hero-bg-yellow"></div>
        </div>

        {/* Person Image Layers - Blue */}
        <div className="hero-person-blue-layer">
          <Image
            src="/images/hero_people_002.png"
            alt="Hero Person 2"
            className="hero-person-blue-image"
            width={400}
            height={600}
          />
        </div>

        {/* Person Image Layers - Green */}
        <div className="hero-person-green-layer">
          <Image
            src="/images/hero_people_003.png"
            alt="Hero Person 3"
            className="hero-person-green-image"
            width={400}
            height={600}
          />
        </div>

        {/* Logo Typography Layers */}
        <div className="hero-logo hero-logo-top">
          <Image src="/images/symbol_wire_001.svg" alt="WatchMe Logo" width={200} height={200} />
        </div>
        <div className="hero-logo hero-logo-middle">
          <Image src="/images/symbol_001.svg" alt="WatchMe Logo" width={200} height={200} />
        </div>
        <div className="hero-logo hero-logo-bottom">
          <Image src="/images/symbol_wire_001.svg" alt="WatchMe Logo" width={200} height={200} />
        </div>

        {/* Device Image Layer */}
        <div className="hero-device-layer">
          <Image
            src="/images/hero_device_001.png"
            alt="Device"
            className="hero-device-image"
            width={400}
            height={600}
          />
          <Image
            src="/images/heart_purple_front_001.png"
            alt="Icon"
            className="hero-device-icon hero-device-icon-1"
            width={160}
            height={160}
          />
          <Image
            src="/images/heart_purple_front_001.png"
            alt="Icon"
            className="hero-device-icon hero-device-icon-2"
            width={80}
            height={80}
          />
          <Image
            src="/images/heart_purple_front_001.png"
            alt="Icon"
            className="hero-device-icon hero-device-icon-3"
            width={240}
            height={240}
          />
        </div>

        {/* Text Content Layer */}
        <div className="hero-content-layer">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">WatchMe | ウォッチミー</h1>
              <p className="hero-description">
                音声×AIで「こころ」を可視化<br />
                子どもの発達障がい支援、メンタルヘルスケアに
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Introduction Section */}
      <section className="product-intro">
        <div className="container">
          <div className="product-intro-content">
            <div className="product-intro-image">
              <Image
                src="/images/product_observer_001.png"
                alt="WatchMe デバイス"
                className="device-image"
                width={500}
                height={500}
              />
            </div>
            <div className="product-intro-text">
              <h2 className="product-intro-title">音声×AIで「こころ」がわかる</h2>
              <p className="product-intro-description">
                ウェアラブルデバイスによる操作不要の測定と分析により、発達特性、認知傾向、メンタルヘルスを可視化。<br />
                家庭や療育／教育の現場で、客観的かつ定量的なデータに基づく「こころの分析」を提供。適切な支援へと繋ぎます。<br />
                すべての人が、いつでも簡単に利用することができる「こころの体温計」が誕生しました。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">製品概要</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>高精度音声分析</h3>
              <p>OpenAI Whisperによる精密な音声認識と、ChatGPTによる多次元感情分析で、話し方の微細な変化まで捉えます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>リアルタイム可視化</h3>
              <p>感情の時系列変化を美しいグラフで表示。30分間隔でのモニタリングにより、一日の心理的な波を詳細に把握できます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI学習システム</h3>
              <p>継続的な学習により、あなた独自の感情パターンを理解。個人に最適化された分析とアドバイスを提供します。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>プライバシー保護</h3>
              <p>エンドツーエンド暗号化により、あなたの大切なデータを完全保護。GDPR準拠のセキュリティ基準を満たしています。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
