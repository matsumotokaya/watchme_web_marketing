'use client';

import Image from 'next/image';
import HeroParallax from '@/components/HeroParallax';
import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: フォーム送信処理
    console.log('Form submitted:', formData);
    alert('お問い合わせありがとうございます。後ほど担当者からご連絡いたします。');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', gender: '', age: '', comment: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              <button
                className="btn-early-access"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="material-icons">bolt</span>
                アーリーアクセス
              </button>
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
              <div className="feature-image">
                <Image
                  src="/images/feature_001.png"
                  alt="高精度音声分析"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>高精度音声分析</h3>
              <p>最新のASR(音声言語認識AI)を使った言語認識とLLMによる状況認識を組み合わせることで、観測時の状況を正確に認識。さらに、観測対象のプロファイルと時間、場所、シーズンなどのコンテクスト情報を組み合わせることで、何が起きているのか正確に分析、記録できます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <Image
                  src="/images/feature_002.png"
                  alt="韻律的情報の解析"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>韻律的情報の解析</h3>
              <p>発話内容よりもトーンを重視します。声の大きさ、トーン、ピッチ、揺らぎといった韻律的情報に加え、527種類の音響イベント検出と感情認識により、話し方の微細な変化まで逃さず捉えます。</p>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <Image
                  src="/images/feature_003.png"
                  alt="マルチデバイス対応"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>マルチデバイス対応</h3>
              <p>オブザーバーと呼ばれる専用デバイスを身につけるだけで、操作不要でどこでも自動的に記録・アクセスが可能です。さらに、iOSアプリでの音声録音から、Webダッシュボードでの詳細な集計分析まで対応しています。</p>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <Image
                  src="/images/feature_004.png"
                  alt="リアルタイム可視化"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>リアルタイム可視化</h3>
              <p>録音データは即時処理されダッシュボードに表示されます。感情の時系列変化や気分の推移を美しいグラフで表示し、一日の心理的な波を詳細に把握することが可能です。また、1日や1週間単位の集計により、長期的なトレンドも可視化します。</p>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <Image
                  src="/images/feature_005.png"
                  alt="プライバシー保護"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>プライバシー保護</h3>
              <p>プライバシーに配慮し、音響情報以外のデータは即座に削除されるため、会話内容は保存されません。また、6時間毎に削除APIが巡回し自動削除される仕組みとなっており、データの安全性を確保しています</p>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <Image
                  src="/images/feature_006.png"
                  alt="AI学習システム"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3>AI学習システム</h3>
              <p>蓄積されたデータから、LLMが1日分や1週間分の情報を集約して分析します。継続的なモニタリングにより、その人独自の「認知の偏り」や「得意不得意」といった特性を理解し、個人の傾向に基づいたインサイトや、印象的なイベントの抽出を提供します。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="contact-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="contact-modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className="contact-modal-title">アーリーアクセス申し込み</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">お名前 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">メールアドレス *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">性別</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">選択してください</option>
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age">年齢</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">コメント</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                  className="form-input form-textarea"
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                送信
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
