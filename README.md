# WatchMe Marketing Website

WatchMe AI音声分析プラットフォームの製品紹介サイトです。

## 🌟 特徴

- **モダンデザイン**: Glassmorphism・グラデーション・アニメーション
- **レスポンシブ**: モバイルファースト設計
- **パフォーマンス**: 軽量・高速ローディング
- **インタラクティブ**: スムーススクロール・アニメーション効果
- **アクセシブル**: セマンティックHTML・キーボードナビゲーション

## 📁 ファイル構成

```
web_marketing/
├── index.html          # メインHTMLファイル
├── styles.css          # CSSスタイルシート
├── script.js           # JavaScriptインタラクション
├── images/             # 画像フォルダ（ダミー配置用）
│   ├── dashboard-hero.png    # ヒーロー部ダッシュボード画像
│   └── technology-diagram.png # 技術アーキテクチャ図
└── README.md           # このファイル
```

## 🎨 デザインコンセプト

### カラーパレット
- **プライマリ**: `#3b82f6` (ブルー)
- **セカンダリ**: `#10b981` (グリーン)  
- **アクセント**: `#f59e0b` (オレンジ)
- **背景**: `#ffffff` / `#f8fafc`
- **テキスト**: `#1e293b` / `#64748b`

### タイポグラフィ
- **フォント**: Inter (Google Fonts)
- **見出し**: 700 (Bold)
- **本文**: 400 (Regular)
- **リンク**: 500 (Medium)

### レイアウト
- **グリッドシステム**: CSS Grid & Flexbox
- **ブレークポイント**: 768px (タブレット), 480px (モバイル)
- **最大幅**: 1200px
- **スペーシング**: 8px基準システム

## 🚀 使用方法

### ローカル開発
```bash
# シンプルHTTPサーバーで起動
python3 -m http.server 8000

# または
npx serve .

# ブラウザで http://localhost:8000 にアクセス
```

### 本番デプロイ
- **静的ホスティング**: Netlify, Vercel, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Webサーバー**: Nginx, Apache

## 📊 主要セクション

### 1. ヒーローセクション
- キャッチコピー
- CTAボタン
- ダッシュボードプレビュー
- フローティングカード

### 2. 機能紹介
- 6つの主要機能
- アイコン + 説明
- ホバーエフェクト

### 3. 技術説明
- AI技術スタック
- アーキテクチャ図
- プロセスフロー

### 4. 活用シーン
- ビジネス、医療、教育、個人
- 具体的なユースケース

### 5. 料金プラン
- 3段階プラン
- 機能比較表
- おすすめプラン強調

### 6. CTA & フッター
- 最終行動促進
- サイトマップ
- 会社情報

## ⚡ JavaScript機能

### インタラクション
- **ナビゲーション**: スクロール連動・スムーススクロール
- **アニメーション**: Intersection Observer・フェードイン
- **ボタン**: リップルエフェクト・ホバーアニメーション
- **カウンター**: 数値カウントアップアニメーション
- **パララックス**: スクロール連動視差効果

### レスポンシブ機能
- **モバイルメニュー**: ハンバーガーメニュー
- **タッチ最適化**: スワイプジェスチャー対応
- **パフォーマンス**: throttle/debounce最適化

## 🖼️ 画像の設置

以下の画像を `images/` フォルダに配置してください：

### dashboard-hero.png
- **サイズ**: 600x400px
- **内容**: WatchMeダッシュボードのスクリーンショット
- **推奨**: 感情タイムライン・統計データ表示

### technology-diagram.png  
- **サイズ**: 500x300px
- **内容**: 技術アーキテクチャ図
- **推奨**: AI処理フロー・システム構成図

## 🔧 カスタマイズ

### 色の変更
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### フォントの変更
```css
:root {
    --font-family: 'Your-Font', sans-serif;
}
```

### アニメーション調整
```css
:root {
    --transition-fast: 150ms ease-in-out;
    --transition-base: 250ms ease-in-out;
}
```

## 📈 パフォーマンス

### 最適化済み
- **CSS**: ミニファイ・クリティカルCSS
- **JavaScript**: 非同期ローディング・分割読み込み
- **画像**: 遅延読み込み・WebP対応
- **フォント**: font-display: swap

### 目標指標
- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 2秒
- **Largest Contentful Paint**: < 2.5秒
- **Cumulative Layout Shift**: < 0.1

## 🧪 ブラウザサポート

### 対応ブラウザ
- **Chrome**: 90+
- **Firefox**: 90+  
- **Safari**: 14+
- **Edge**: 90+

### 使用技術
- **CSS Grid**: IE11除く全モダンブラウザ
- **Intersection Observer**: Polyfill利用で IE11対応
- **ES6+**: Babel変換で広範囲サポート

## 🔐 ユーザー認証システム

WatchMeマーケティングサイトには完全なユーザー認証システムが実装されています。

### 📋 実装機能
- **新規会員登録**: メール認証付きアカウント作成
- **ログイン**: パスワード認証・ログイン状態保持
- **パスワードリセット**: メール経由でのパスワード変更
- **ソーシャル認証**: Google OAuth対応
- **プロファイル管理**: ユーザー情報の自動保存

### 🗄️ データベース構造

**Supabase Authentication (auth.users)**:
- ユーザー認証情報（メール、パスワード等）
- メタデータ（表示名、設定等）

**Users テーブル (public.users)**:
- user_id (auth.usersと連携)
- name (表示名)
- email (メールアドレス)
- newsletter_subscription (ニュースレター購読)
- created_at / updated_at

### 🔧 認証設定

**環境変数 (.env)**:
```env
SUPABASE_URL=https://qvtlwotzuzbavrzqhyvt.supabase.co
SUPABASE_ANON_KEY=your-anon-key
NODE_ENV=development
```

**認証ページ**:
- `signup.html` - 新規会員登録
- `login.html` - ログイン
- `auth.js` - 認証処理ロジック

### 🧪 テスト方法

**Gmail + エイリアス機能**を使用:
```
example+test1@gmail.com
example+test2@gmail.com
example+signup@gmail.com
```

すべて同じGmailアドレスに届きますが、Supabaseでは別々のユーザーとして認識されます。

### ✅ 動作確認済み
- **新規会員登録**: ✅ auth.users + usersテーブル両方に保存
- **メール確認**: ✅ Supabase認証メール送信
- **データベース連携**: ✅ プロファイル情報の自動保存
- **エラーハンドリング**: ✅ 日本語エラーメッセージ表示

## 📝 更新履歴

- **v1.1** (2025-07-02): ユーザー認証システム実装
  - Supabase Auth統合
  - 新規会員登録・ログイン機能
  - プロファイル管理システム
  - データベース連携機能

- **v1.0** (2025-01-15): 初期バージョン作成
  - レスポンシブデザイン実装
  - インタラクティブアニメーション追加
  - パフォーマンス最適化

## 🤝 開発ガイドライン

### コーディング規約
- **HTML**: セマンティック・アクセシブル
- **CSS**: BEM記法・CSS変数活用
- **JavaScript**: ES6+・関数型プログラミング

### 品質チェック
- **HTML**: W3C Validator
- **CSS**: stylelint
- **JavaScript**: ESLint
- **アクセシビリティ**: WAVE, axe

---

**WatchMe Marketing Website v1.1**  
🎯 高品質・高パフォーマンスなマーケティングサイト  
🔑 SSH接続設定完了