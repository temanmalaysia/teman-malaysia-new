import Image from 'next/image';
import Link from 'next/link';

const mediaLogos = [
  {
    id: 'bfm',
    name: 'BFM 89.9',
    logo: '/img/media/bfm-logo.png',
    url: 'https://www.bfm.my/podcast/enterprise/hervantage/ent-hv-teman-a-companion-for-the-elderly',
  },
  {
    id: 'berita-harian',
    name: 'Berita Harian',
    logo: '/img/media/berita-harian-logo.png',
    url: 'https://www.bharian.com.my/berita/nasional/2021/08/846055/teman-di-saat-memerlukan',
  },
  {
    id: 'utusan',
    name: 'Utusan Malaysia',
    logo: '/img/media/utusan-logo.png',
    url: 'https://www.utusan.com.my/ekonomi/2021/05/teman-malaysia-bantu-menjaga-warga-emas/',
  },
  {
    id: 'says',
    name: 'SAYS',
    logo: '/img/media/says-logo.png',
    url: 'https://says.com/my/lifestyle/service-to-help-elderly',
  },
  {
    id: 'malaysiakini',
    name: 'Malaysiakini',
    logo: '/img/media/malaysiakini-logo.png',
    url: 'https://www.malaysiakini.com/news/576449',
  },
  {
    id: 'the-edge',
    name: 'The Edge Malaysia',
    logo: '/img/media/the-edge-logo.png',
    url: 'https://www.theedgemarkets.com/article/aged-care-offering-companionship-elderly',
  },
];

export default function News() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...mediaLogos, ...mediaLogos];

  return (
    <section className="news section">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <span className="section__tag">As Featured on</span>
          <h2 className="section__title">News</h2>
          <div className="section__divider"></div>
        </div>

        {/* Carousel */}
        <div className="news__carousel">
          <div className="news__track">
            {duplicatedLogos.map((media, index) => (
              <div key={`${media.id}-${index}`} className="news__item">
                <Link
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={media.name}
                >
                  <Image
                    src={media.logo}
                    alt={media.name}
                    width={150}
                    height={60}
                    className="news__logo"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
