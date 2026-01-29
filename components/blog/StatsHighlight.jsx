const statsData = {
  en: {
    title: "Malaysia's Aging Population: Key Facts 2025",
    stats: [
      "11.6% of Malaysia's population (3.9 million people) are aged 60+ in 2024",
      "Projected to reach 17.3% by 2040",
      "494 nursing homes nationwide as of 2025"
    ]
  },
  ms: {
    title: "Populasi Warga Emas Malaysia: Fakta Utama 2025",
    stats: [
      "11.6% penduduk Malaysia (3.9 juta orang) berusia 60+ pada 2024",
      "Dijangka mencapai 17.3% menjelang 2040",
      "494 rumah orang tua di seluruh negara setakat 2025"
    ]
  }
};

export default function StatsHighlight({ language = 'en' }) {
  const content = statsData[language] || statsData.en;

  return (
    <div className="stats-highlight">
      <strong className="stats-highlight__title">{content.title}</strong>
      <p className="stats-highlight__content">
        {content.stats.join(' | ')}
      </p>
    </div>
  );
};