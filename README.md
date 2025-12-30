# WatchMe Corporate Site

WatchMe AI音声分析プラットフォームのコーポレートサイト

## 🚀 技術スタック

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (ホスティング)

## 📦 開発環境

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
# http://localhost:3000

# ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🌐 デプロイ

GitHubにプッシュすると自動的にVercelにデプロイされます。

```bash
git add .
git commit -m "update"
git push origin main
```

**デプロイURL**: https://watchme-web-marketing.vercel.app

## 📁 構成

```
corporate-site/
├── app/
│   ├── layout.tsx          # 共通レイアウト
│   ├── page.tsx            # トップページ
│   ├── company/page.tsx    # 会社概要
│   ├── privacy/page.tsx    # プライバシーポリシー
│   └── terms/page.tsx      # 利用規約
├── components/
│   ├── Header.tsx          # ヘッダー（モバイルメニュー含む）
│   ├── Footer.tsx          # フッター
│   └── HeroParallax.tsx    # パララックス効果
└── public/images/          # 画像アセット
```

## ✨ 主な機能

- ヒーローセクションのパララックス効果
- スクロール連動すりガラスヘッダー
- モバイルハンバーガーメニュー（×アニメーション）
- レスポンシブデザイン

## 🔧 インフラ

- **ホスティング**: Vercel
- **リポジトリ**: GitHub (`matsumotokaya/watchme_web_marketing`)
- **ドメイン**: Vercel管理
- **CI/CD**: GitHub → Vercel自動デプロイ
