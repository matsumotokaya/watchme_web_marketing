export const metadata = {
  title: 'プライバシーポリシー - WatchMe',
};

export default function PrivacyPage() {
  return (
    <main className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>プライバシーポリシー</h1>
          <p className="policy-date">最終更新日: 2025年10月18日</p>
        </div>

        <p className="policy-intro">
          WatchMe Team（以下「当社」といいます）は、本アプリケーションにおけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </p>

        <div className="policy-section">
          <h2>1. 収集する個人情報</h2>
          <p>当社は、本アプリの提供にあたり、以下の個人情報を収集します。</p>

          <p><strong>【アカウント情報】</strong></p>
          <ul>
            <li>メールアドレス</li>
            <li>パスワード（暗号化して保存）</li>
            <li>ユーザー名（任意）</li>
            <li>プロフィール画像（任意）</li>
          </ul>

          <p><strong>【利用データ】</strong></p>
          <ul>
            <li>音声録音データ（手動録音、および外部デバイスからのアップロード）</li>
            <li>録音日時とタイムゾーン情報</li>
            <li>デバイス識別情報</li>
            <li>アプリの利用履歴</li>
          </ul>

          <p><strong>【分析データ】</strong></p>
          <ul>
            <li>AI による感情分析結果</li>
            <li>行動パターン分析結果</li>
            <li>統計データ</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>2. 個人情報の利用目的</h2>
          <p>収集した個人情報は、以下の目的で利用します。</p>
          <ul>
            <li>本アプリのサービス提供</li>
            <li>ユーザーの感情・行動分析とフィードバック</li>
            <li>ユーザーサポートの提供</li>
            <li>サービスの改善と新機能の開発</li>
            <li>統計データの作成（個人を特定できない形式）</li>
            <li>重要なお知らせや更新情報の通知</li>
            <li>利用規約違反への対応</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>3. 個人情報の管理</h2>
          <p>当社は、個人情報を以下の方法で適切に管理します。</p>

          <p><strong>【セキュリティ対策】</strong></p>
          <ul>
            <li>SSL/TLS による通信の暗号化</li>
            <li>データベースの暗号化</li>
            <li>アクセス権限の厳格な管理</li>
            <li>定期的なセキュリティ監査</li>
          </ul>

          <p><strong>【保存期間】</strong></p>
          <ul>
            <li>アカウント削除後、30日以内にすべての個人情報を削除</li>
            <li>音声データは録音から90日間保存（設定により変更可能）</li>
            <li>分析結果は無期限で保存（個人識別情報は除外）</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>4. 個人情報の第三者提供</h2>
          <p>当社は、以下の場合を除き、個人情報を第三者に提供しません。</p>
          <ul>
            <li>ユーザーの同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要な場合</li>
            <li>公衆衛生の向上または児童の健全な育成の推進のために必要な場合</li>
            <li>国の機関等の法令の定める事務の遂行に協力する必要がある場合</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>5. 外部サービスの利用</h2>
          <p>本アプリは、以下の外部サービスを利用しています。</p>

          <p><strong>【Supabase】</strong></p>
          <ul>
            <li>認証とデータベース管理</li>
            <li>プライバシーポリシー: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">https://supabase.com/privacy</a></li>
          </ul>

          <p><strong>【OpenAI API】</strong></p>
          <ul>
            <li>感情分析と自然言語処理</li>
            <li>データは分析のみに使用され、OpenAI のモデル訓練には使用されません</li>
            <li>プライバシーポリシー: <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer">https://openai.com/privacy</a></li>
          </ul>

          <p><strong>【Amazon S3】</strong></p>
          <ul>
            <li>音声ファイルとアバター画像の保存</li>
            <li>プライバシーポリシー: <a href="https://aws.amazon.com/privacy" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/privacy</a></li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>6. Cookieの使用</h2>
          <p>本アプリでは、サービス向上のため、Cookie および類似技術を使用することがあります。</p>
          <ul>
            <li>セッション管理</li>
            <li>ユーザー設定の保存</li>
            <li>利用状況の分析</li>
          </ul>
          <p>ユーザーは、デバイスの設定により Cookie を無効にすることができますが、一部の機能が利用できなくなる場合があります。</p>
        </div>

        <div className="policy-section">
          <h2>7. 子どものプライバシー</h2>
          <p>本アプリは、13歳未満の子どもを対象としていません。13歳未満の子どもの個人情報を意図的に収集することはありません。</p>
          <p>13歳未満の子どもが個人情報を提供したことが判明した場合、速やかに削除します。</p>
        </div>

        <div className="policy-section">
          <h2>8. ユーザーの権利</h2>
          <p>ユーザーは、自己の個人情報について以下の権利を有します。</p>
          <ul>
            <li>開示請求: 保有する個人情報の開示を請求する権利</li>
            <li>訂正請求: 個人情報の訂正を請求する権利</li>
            <li>削除請求: 個人情報の削除を請求する権利</li>
            <li>利用停止請求: 個人情報の利用停止を請求する権利</li>
            <li>データポータビリティ: 個人情報を機械可読形式で受け取る権利</li>
          </ul>
          <p>これらの請求は、アプリ内の設定画面またはサポート窓口から行うことができます。</p>
        </div>

        <div className="policy-section">
          <h2>9. プライバシーポリシーの変更</h2>
          <p>当社は、必要に応じて本ポリシーを変更することがあります。</p>
          <p>重要な変更がある場合は、アプリ内通知またはメールでお知らせします。変更後の本ポリシーは、アプリ内に掲示した時点から効力を生じるものとします。</p>
        </div>

        <div className="policy-section">
          <h2>10. お問い合わせ</h2>
          <p>本ポリシーに関するお問い合わせは、以下の窓口までお願いします。</p>
          <p>
            WatchMe Team<br />
            メール: support@hey-watch.me<br />
            お問い合わせフォーム: アプリ内設定画面より
          </p>
        </div>

        <div className="policy-footer-text">
          <p>以上</p>
        </div>
      </div>
    </main>
  );
}
