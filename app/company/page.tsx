import Image from 'next/image';

export const metadata = {
  title: 'Company - WatchMe',
  description: 'WatchMeは神経学的に多様な社会を実現します',
};

export default function CompanyPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <h1 className="page-title">Company</h1>
            <p className="page-subtitle">WatchMeは神経学的に多様な社会を実現します</p>
          </div>
        </div>
      </section>

      {/* Purpose Content Section */}
      <section className="purpose-content">
        <div className="container">
          <div className="purpose-image-section">
            <Image
              src="/images/purpose_people_003.png"
              alt="ニューロダイバーシティの実現"
              className="purpose-image"
              width={1200}
              height={600}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
