import Image from 'next/image';

export const metadata = {
  title: 'Company - WatchMe',
  description: 'WatchMeは神経学的に多様な社会を実現します',
};

export default function CompanyPage() {
  return (
    <main className="vision-page">
      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-container">
          <h1 className="vision-title">ニューロダイバーシティの実現</h1>

          <div className="vision-text">
            <p>
              すべての人は、異なる脳と身体を持っています。しかし、社会はまだそれを受け入れられるほど成熟していません。私たちは人を定型／非定型で分類することで「発達障害」を生み出しています。
            </p>
            <p>
              もし、こころを可視化するテクノロジーがあるなら「自分たち」と「彼ら」を分かつ境界線など存在しないことが分かるはずです。本当の意味で、すべての人が、神経学的多様性を受容できたなら「発達障害」という言葉は不要です。そもそも「まともな人間」など最初から存在しないのです。
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
