export const metadata = {
  title: 'プライバシーポリシー - WatchMe',
};

// Keep in sync with the in-app policy (ios-watchme PrivacyPolicyView.swift).
export default function PrivacyPage() {
  return (
    <main className="policy-page">
      <div className="policy-container">
        <div className="policy-header">
          <h1>プライバシーポリシー</h1>
          <p className="policy-date">最終更新日: 2026年11月20日</p>
        </div>

        <p className="policy-intro">
          WatchMe Team（以下「当社」といいます）は、本アプリケーション（以下「本アプリ」といいます）および本ウェブサイト（https://hey-watch.me）におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </p>

        <div className="policy-section">
          <h2>1. 収集する個人情報</h2>
          <p>当社は、本アプリおよび本ウェブサイトの提供にあたり、以下の個人情報を収集します。</p>

          <p><strong>【アカウント情報】</strong></p>
          <ul>
            <li>メールアドレス（Google アカウントでログインした場合は、Google から受け取るもの）</li>
            <li>パスワード（メールアドレスで登録した場合。暗号化して保存）</li>
            <li>ユーザー名・プロフィール画像（任意）</li>
          </ul>

          <p><strong>【分析対象（お子さまなど）の情報】</strong></p>
          <ul>
            <li>名前、年齢、性別、メモなど、利用者が登録した情報（任意）</li>
          </ul>

          <p><strong>【録音と分析のデータ】</strong></p>
          <ul>
            <li>iPhone で録音した音声、および利用者が取り込んだ動画・音声ファイルの音声</li>
            <li>録音日時とタイムゾーン</li>
            <li>音声から作る文字起こし、会話の指標（話した量・速さ・間など）、声の特徴、周囲の音、出来事（叱る・褒める・笑う などの回数）、分析の文章</li>
            <li>デバイスの識別情報、プッシュ通知のための識別子</li>
          </ul>
          <p>録音には、利用者本人のほか、ご家族やお子さまなど、その場にいる方の声が含まれます。</p>

          <p><strong>【本ウェブサイトでのアーリーアクセスのお申し込み】</strong></p>
          <ul>
            <li>お名前、メールアドレス</li>
            <li>性別、年齢、コメント（任意）</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>2. 個人情報の利用目的</h2>
          <p>収集した個人情報は、以下の目的で利用します。</p>
          <ul>
            <li>録音の分析と、その結果の表示（日ごとの変化、出来事の回数など）</li>
            <li>数えた出来事の場面の再生（「録音の音声を残す」の項目のとおり）</li>
            <li>分析が終わったことなどのお知らせ</li>
            <li>ユーザーサポートの提供</li>
            <li>本アプリの改善（研究への協力に同意した方の音声については、「研究への協力」の項目のとおり）</li>
            <li>利用規約違反への対応</li>
            <li>アーリーアクセスのお申し込みへのご連絡とご案内</li>
          </ul>
          <p>本アプリの分析は、医療的な診断を行うものではありません。</p>
        </div>

        <div className="policy-section">
          <h2>3. 個人情報の管理</h2>
          <p>当社は、個人情報を以下の方法で適切に管理します。</p>

          <p><strong>【セキュリティ対策】</strong></p>
          <ul>
            <li>通信の暗号化（TLS）と、保存するデータの暗号化</li>
            <li>利用者は、自分が連携しているデバイスのデータだけを閲覧できます</li>
          </ul>

          <p><strong>【保存場所】</strong></p>
          <ul>
            <li>データは日本国内（東京）のサーバーに保存します。分析の一部は、下記の外部サービスで処理します（文字起こしに使う ElevenLabs では、音声と文字起こしが米国のサーバーに保存されます）</li>
          </ul>

          <p><strong>【保存期間】</strong></p>
          <ul>
            <li>音声: 分析が終わってから3日で削除します（研究への協力に同意した場合と、録音の音声を残す設定にした場合を除く）</li>
            <li>文字起こし・分析結果・分析対象の情報: アカウントがある間保存し、アカウントの削除とともに削除します</li>
            <li>アカウントを削除すると、そのアカウントだけが使っているデバイスの録音と分析結果、分析対象の情報、プロフィール画像も削除します。他のアカウントも連携しているデバイスのデータは、連携だけを解除して残します</li>
            <li>アーリーアクセスのお申し込みの情報: ご案内が終わるまで保存します。削除をご希望の場合は、下記の窓口までご連絡ください</li>
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
          <p>本アプリは、録音の分析と保存のために、以下の外部サービスを利用しています。各サービスに送ったデータは、本アプリの処理のためだけに使われ、各社の AI モデルの学習には使われない契約・設定で利用しています。</p>

          <p><strong>【ElevenLabs（Speech to Text API）】</strong></p>
          <ul>
            <li>文字起こし（音声を送ります。音声と文字起こしは、同社の米国のサーバーで処理・保存されます）</li>
            <li>プライバシーポリシー: <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noopener noreferrer">https://elevenlabs.io/privacy-policy</a></li>
          </ul>

          <p><strong>【Google（Gemini API）】</strong></p>
          <ul>
            <li>録音を聞いての、場面・話している人・出来事の記録（音声、文字起こし、声の測定値、登録された分析対象の情報を送ります）</li>
            <li>プライバシーポリシー: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a></li>
          </ul>

          <p><strong>【OpenAI（API）】</strong></p>
          <ul>
            <li>分析の文章（文字起こし、上の記録、登録された分析対象の情報を送ります。音声は送りません）</li>
            <li>プライバシーポリシー: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">https://openai.com/policies/privacy-policy</a></li>
          </ul>

          <p><strong>【Amazon Web Services（東京リージョン）】</strong></p>
          <ul>
            <li>音声の保存と分析の処理</li>
            <li>プライバシーポリシー: <a href="https://aws.amazon.com/privacy" target="_blank" rel="noopener noreferrer">https://aws.amazon.com/privacy</a></li>
          </ul>

          <p><strong>【Supabase（東京リージョン）】</strong></p>
          <ul>
            <li>ログインとデータベース、アーリーアクセスのお申し込みの保存</li>
            <li>プライバシーポリシー: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">https://supabase.com/privacy</a></li>
          </ul>

          <p>本ウェブサイトは、以下の外部サービスを利用しています。</p>

          <p><strong>【Vercel】</strong></p>
          <ul>
            <li>本ウェブサイトの配信</li>
            <li>プライバシーポリシー: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</a></li>
          </ul>

          <p><strong>【Resend】</strong></p>
          <ul>
            <li>アーリーアクセスのお申し込みを当社の窓口へ知らせるメールの送信</li>
            <li>プライバシーポリシー: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://resend.com/legal/privacy-policy</a></li>
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
          <p>本アプリは、保護者が利用者となり、お子さまを分析対象として登録して使うことを想定しています。13歳未満の方が自分でアカウントを作ることは想定していません。</p>
          <p>お子さまの声や情報は、保護者である利用者の判断と同意のもとで録音・登録してください。お子さまの情報の削除は、分析対象の削除、デバイスの削除、またはアカウントの削除で行えます。</p>
        </div>

        <div className="policy-section">
          <h2>8. 研究への協力（任意）</h2>
          <p>会員登録のとき、または初めてログインしたときに、研究への協力を選べます。協力するかどうかは任意で、マイページでいつでも変更できます。</p>
          <ul>
            <li>協力した場合: 録音した音声を研究用の保管場所に残し、本アプリの分析の改善（精度の確認や、分析に使うモデルの評価・学習）のためだけに使います。外部に提供したり、公開したりしません</li>
            <li>協力しない場合: 音声は分析が終わってから3日で削除します</li>
            <li>取りやめた場合: それまでに保管した音声を削除します（同じデバイスに連携している別のアカウントが協力している場合、そのデバイスの音声は残ります）</li>
            <li>いつ、どの内容に同意したかを記録します</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>9. 録音の音声を残す（任意）</h2>
          <p>初めてログインしたときに、録音の音声を残すかどうかを選べます。残すかどうかは任意で、マイページでいつでも変更できます。</p>
          <ul>
            <li>残す場合: 録音の音声（圧縮したもの）を保存し、数えた出来事（叱責や褒め言葉など）のその場面を、利用者があとから再生できるようにします。再生できるのは、そのデバイスに連携している利用者だけです。研究や分析の改善には使いません</li>
            <li>残さない場合: 音声は分析が終わってから3日で削除します。3日のあいだは再生できます</li>
            <li>やめた場合: それまでに残した音声を削除します（同じデバイスに連携している別のアカウントが残している場合、そのデバイスの音声は残ります）</li>
            <li>アカウントやデバイスを削除したときも、残した音声を削除します</li>
            <li>録音には、ご家族やお子さまの声が含まれます。保護者として、録音に含まれる方の了解を得たうえで選んでください</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>10. ユーザーの権利</h2>
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
          <h2>11. プライバシーポリシーの変更</h2>
          <p>当社は、必要に応じて本ポリシーを変更することがあります。</p>
          <p>重要な変更がある場合は、アプリ内通知またはメールでお知らせします。変更後の本ポリシーは、アプリ内または本ウェブサイトに掲示した時点から効力を生じるものとします。</p>
        </div>

        <div className="policy-section">
          <h2>12. お問い合わせ</h2>
          <p>本ポリシーに関するお問い合わせは、以下の窓口までお願いします。</p>
          <p>
            WatchMe Team<br />
            メール: <a href="mailto:support@hey-watch.me">support@hey-watch.me</a><br />
            アプリからは、設定画面の「お問い合わせ」からもご連絡いただけます。
          </p>
        </div>

        <div className="policy-footer-text">
          <p>以上</p>
        </div>
      </div>
    </main>
  );
}
