import BlogCard from './BlogCard';

const blogArticles = {
  en: [
    {
      date: 'September 2025',
      title: "Malaysia's Demographic Shift: Preparing for an Aged Nation by 2040",
      paragraphs: [
        "Malaysia is experiencing an unprecedented demographic transformation. According to the Department of Statistics Malaysia (DOSM), the elderly population aged 60 and above currently comprises 11.6% of the total population (3.9 million people) in 2024, up from just 5.5% in 1970. By 2040, this figure is projected to reach 17.3% (6.4 million people), with Malaysia expected to achieve \"super-aged society\" status by 2057 when 20.5% of the population will be over 60.",
        "This rapid aging is attributed to declining fertility rates, improved healthcare, and increased life expectancy. The implications are far-reaching, affecting healthcare systems, pension schemes, and family structures across the nation."
      ],
      references: {
        title: 'References:',
        items: [
          'The Star. (2024). "Elderly population to hit 17% by 2040, says Stats Dept"',
          'United Nations Development Programme Malaysia. (2024). "Navigating the future of care for older persons in Malaysia by 2040"'
        ]
      }
    },
    {
      date: 'August 2025',
      title: 'Current State of Elderly Care Facilities in Malaysia',
      paragraphs: [
        "As of January 2025, Malaysia hosts 494 nursing homes, representing a 9.43% increase from 2023. However, this growth falls short of meeting the escalating demand. The country currently has 393 registered elderly care centers and 26 nursing homes, with estimates indicating between 700 to over 1,000 unregistered facilities operating nationwide.",
        "A significant challenge exists in the urban-rural divide, with most facilities concentrated in urban areas, leaving rural communities underserved. The shortage of trained caregivers and geriatric specialists compounds these accessibility issues."
      ],
      references: {
        title: 'References:',
        items: [
          'Ixora Senior Care. (2025). "Elderly Care in Malaysia: Trends & Statistics for 2025"',
          'UNDP Malaysia. (2024). "Navigating the future of care for older persons in Malaysia by 2040"'
        ]
      }
    },
    {
      date: 'July 2025',
      title: 'Types of Elderly Care Services Available in Malaysia',
      paragraphs: [
        "Malaysia offers diverse elderly care options including home care services (RM20-40 per hour), assisted living facilities (RM1,500-10,000 monthly), nursing homes (RM2,000-6,000 monthly), and day care centers. Home care services have gained popularity, allowing seniors to remain in familiar environments while receiving professional support.",
        "Specialized services include post-operative care, dementia care, palliative care, and rehabilitation services. Companies like Care Concierge, My Aged Care, and Komune Care lead the market with comprehensive service packages tailored to individual needs."
      ],
      references: {
        title: 'References:',
        items: [
          'Elderly Care Malaysia. (2023). "Elderly Care Centre Malaysia 2025"',
          'Care Concierge. (2024). "Home Care and Nursing Service for Elderly"'
        ]
      }
    },
    {
      date: 'June 2025',
      title: 'Financial Challenges and Support Systems',
      paragraphs: [
        "The Employees' Provident Fund (EPF) reveals that 58% of 54-year-old members have less than RM100,000 saved—insufficient for the recommended RM240,000 needed to generate RM1,000 monthly income for 20 years post-retirement. Only 29% of older persons receive any form of pension.",
        "Government support includes Bantuan Warga Emas cash assistance, Bantuan Keluarga Malaysia (RM300 for seniors 60+), and the Medical Relief Fund (TBP) covering treatment costs exceeding RM50,000. However, broader financial protection mechanisms are urgently needed."
      ],
      references: {
        title: 'References:',
        items: [
          'UNDP Malaysia. (2024). "Community support to technological integration"',
          'Homage Malaysia. (2023). "Financial Assistance for the Elderly in Malaysia"'
        ]
      }
    },
    {
      date: 'May 2025',
      title: 'Government Policies and the 12th Malaysia Plan',
      paragraphs: [
        "The 12th Malaysia Plan (2021-2025) emphasizes senior-friendly community development through Pusat Aktiviti Warga Emas (PAWE) activity centers and age-friendly healthcare facilities. The government is developing IoT-enabled homecare monitoring and virtual medical consultations to support aging in place.",
        "The upcoming Senior Citizens Bill and National Action Plan for Senior Citizens demonstrate Malaysia's commitment to elderly welfare. The 13th Malaysia Plan (RMK13) will adopt a whole-of-government approach focusing on long-term care, social protection, and flexible employment for older citizens."
      ],
      references: {
        title: 'References:',
        items: [
          'The Vibes. (2025). "Government prioritises ageing population with holistic approach in RMK13"',
          'US Trade Gov. (2024). "Malaysia Healthcare Aging Population"'
        ]
      }
    },
    {
      date: 'April 2025',
      title: "Healthcare Challenges for Malaysia's Elderly",
      paragraphs: [
        "Despite increased life expectancy, health span has not kept pace. The Khazanah Research Institute estimates that 9.5 years of life expectancy will be spent in poor health due to non-communicable diseases (NCDs). Three out of four elderly aged 70+ have health problems including arthritis, hypertension, diabetes, and heart complications.",
        "Malaysia's healthcare system, primarily designed for acute care, requires restructuring to address chronic disease management and long-term care needs. The shortage of geriatric specialists and rehabilitation services poses significant challenges."
      ],
      references: {
        title: 'References:',
        items: [
          'Malaysian Journal of Medical Sciences. (2024). "Healthy Ageing in Malaysia by 2030"',
          'PMC. "The Problems and Challenges of the Aging Population of Malaysia"'
        ]
      }
    },
    {
      date: 'March 2025',
      title: 'Technology Integration in Elderly Care',
      paragraphs: [
        "Gerontechnology—technology designed for elderly needs—emerges as a crucial solution. Telehealth services, wearable health devices, and remote monitoring systems are revolutionizing elderly care in Malaysia. These technologies enable early health issue identification, reduce hospital admissions, and support independent living.",
        "Smart home technologies, medication management systems, and emergency response devices are becoming increasingly important in maintaining elderly independence while ensuring safety and health monitoring."
      ],
      references: {
        title: 'References:',
        items: [
          'UNDP Malaysia. (2024). "Technology-driven elderly care solutions"',
          'US Trade Gov. (2024). "IoT in homecare monitoring and virtual consultations"'
        ]
      }
    },
    {
      date: 'February 2025',
      title: 'Family Caregiving and Community Support',
      paragraphs: [
        "Research shows 75% of elderly live with family members, 15% with spouses, and 10% alone. More than 70% of Malaysians believe it's the young generation's duty to care for elderly family members, placing significant burden on a shrinking workforce.",
        "Community-based support programs, adult day care centers, and respite care services are essential to support family caregivers. The development of multigenerational housing policies and community care programs can strengthen family-based care systems."
      ],
      references: {
        title: 'References:',
        items: [
          'Malaysia Population Research Hub. "Elderly Population Statistics"',
          'Statista. (2024). "Share of aging population Malaysia 2015-2024"'
        ]
      }
    },
    {
      date: 'January 2025',
      title: 'Regional Disparities in Elderly Care',
      paragraphs: [
        "Perak leads with 14.9% elderly population, followed by Sarawak (13.4%) and Kedah (13.3%). Twenty districts have the highest elderly concentrations, including Lubok Antu, Sarawak (21.8%), and Sri Aman, Sarawak (18.7%). Rural areas face greater challenges with limited access to specialized care facilities and services.",
        "Urban areas offer better healthcare access and facilities, but face higher costs. Rural elderly often rely more heavily on traditional family support systems, which are increasingly strained by urbanization and migration patterns."
      ],
      references: {
        title: 'References:',
        items: [
          'The Star. (2024). "Elderly population statistics by state and district"',
          'DOSM. (2024). "MyAgeing Dashboard launch"'
        ]
      }
    },
    {
      date: 'December 2024',
      title: 'Market Outlook and Investment Opportunities',
      paragraphs: [
        "Malaysia's elderly care market was valued at USD 975.13 billion in 2024 and is projected to reach USD 1,485.21 billion by 2032, with a CAGR of 5.40%. This growth is driven by increasing demand for home care services, assisted living facilities, and specialized medical equipment.",
        "Investment opportunities exist in technology-enabled care solutions, staff training programs, facility development, and innovative service delivery models. The sector presents significant potential for both local and international investors."
      ],
      references: {
        title: 'References:',
        items: [
          'Data Bridge Market Research. (2024). "Malaysia Elderly Care Market Report"',
          'US Trade Gov. (2024). "Opportunities for senior living villages and medical equipment"'
        ]
      }
    }
  ],
  ms: [
    {
      date: 'September 2025',
      title: 'Perubahan Demografi Malaysia: Bersedia untuk Negara Warga Emas menjelang 2040',
      paragraphs: [
        "Malaysia sedang mengalami transformasi demografi yang tidak pernah terjadi sebelumnya. Menurut Jabatan Perangkaan Malaysia (DOSM), populasi warga emas berusia 60 tahun ke atas kini terdiri daripada 11.6% daripada jumlah penduduk (3.9 juta orang) pada 2024, meningkat daripada hanya 5.5% pada 1970. Menjelang 2040, angka ini diunjurkan mencapai 17.3% (6.4 juta orang), dengan Malaysia dijangka mencapai status \"masyarakat super-emas\" menjelang 2057 apabila 20.5% penduduk akan berusia lebih 60 tahun.",
        "Penuaan pesat ini disebabkan oleh penurunan kadar kesuburan, peningkatan penjagaan kesihatan, dan peningkatan jangka hayat. Implikasinya adalah sangat luas, mempengaruhi sistem penjagaan kesihatan, skim pencen, dan struktur keluarga di seluruh negara."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'The Star. (2024). "Populasi warga emas akan mencapai 17% menjelang 2040"',
          'Program Pembangunan Pertubuhan Bangsa-Bangsa Bersatu Malaysia. (2024). "Menavigasi masa depan penjagaan warga emas di Malaysia menjelang 2040"'
        ]
      }
    },
    {
      date: 'Ogos 2025',
      title: 'Keadaan Semasa Kemudahan Penjagaan Warga Emas di Malaysia',
      paragraphs: [
        "Setakat Januari 2025, Malaysia mempunyai 494 rumah penjagaan, mewakili peningkatan 9.43% daripada 2023. Walau bagaimanapun, pertumbuhan ini tidak mencukupi untuk memenuhi permintaan yang semakin meningkat. Negara ini kini mempunyai 393 pusat penjagaan warga emas berdaftar dan 26 rumah penjagaan, dengan anggaran antara 700 hingga lebih 1,000 kemudahan tidak berdaftar beroperasi di seluruh negara.",
        "Cabaran ketara wujud dalam jurang bandar-luar bandar, dengan kebanyakan kemudahan tertumpu di kawasan bandar, menyebabkan komuniti luar bandar kurang mendapat perkhidmatan. Kekurangan penjaga terlatih dan pakar geriatrik memburukkan lagi isu kebolehcapaian ini."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'Ixora Senior Care. (2025). "Penjagaan Warga Emas di Malaysia: Trend & Statistik untuk 2025"',
          'UNDP Malaysia. (2024). "Menavigasi masa depan penjagaan warga emas di Malaysia menjelang 2040"'
        ]
      }
    },
    {
      date: 'Julai 2025',
      title: 'Jenis Perkhidmatan Penjagaan Warga Emas yang Tersedia di Malaysia',
      paragraphs: [
        "Malaysia menawarkan pelbagai pilihan penjagaan warga emas termasuk perkhidmatan penjagaan di rumah (RM20-40 sejam), kemudahan hidup berbantuan (RM1,500-10,000 bulanan), rumah penjagaan (RM2,000-6,000 bulanan), dan pusat jagaan harian. Perkhidmatan penjagaan di rumah semakin popular, membolehkan warga emas kekal dalam persekitaran yang dikenali sambil menerima sokongan profesional.",
        "Perkhidmatan khusus termasuk penjagaan pasca-pembedahan, penjagaan demensia, penjagaan paliatif, dan perkhidmatan pemulihan. Syarikat seperti Care Concierge, My Aged Care, dan Komune Care mengetuai pasaran dengan pakej perkhidmatan menyeluruh yang disesuaikan dengan keperluan individu."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'Elderly Care Malaysia. (2023). "Pusat Penjagaan Warga Emas Malaysia 2025"',
          'Care Concierge. (2024). "Perkhidmatan Penjagaan dan Kejururawatan di Rumah untuk Warga Emas"'
        ]
      }
    },
    {
      date: 'Jun 2025',
      title: 'Cabaran Kewangan dan Sistem Sokongan',
      paragraphs: [
        "Kumpulan Wang Simpanan Pekerja (KWSP) mendedahkan bahawa 58% ahli berusia 54 tahun mempunyai simpanan kurang daripada RM100,000—tidak mencukupi untuk RM240,000 yang disyorkan bagi menjana pendapatan bulanan RM1,000 selama 20 tahun selepas persaraan. Hanya 29% warga emas menerima apa-apa bentuk pencen.",
        "Sokongan kerajaan termasuk Bantuan Warga Emas, Bantuan Keluarga Malaysia (RM300 untuk warga emas 60+), dan Tabung Bantuan Perubatan (TBP) yang meliputi kos rawatan melebihi RM50,000. Walau bagaimanapun, mekanisme perlindungan kewangan yang lebih luas amat diperlukan."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'UNDP Malaysia. (2024). "Sokongan komuniti kepada integrasi teknologi"',
          'Homage Malaysia. (2023). "Bantuan Kewangan untuk Warga Emas di Malaysia"'
        ]
      }
    },
    {
      date: 'Mei 2025',
      title: 'Dasar Kerajaan dan Rancangan Malaysia Ke-12',
      paragraphs: [
        "Rancangan Malaysia Ke-12 (2021-2025) menekankan pembangunan komuniti mesra warga emas melalui Pusat Aktiviti Warga Emas (PAWE) dan kemudahan penjagaan kesihatan mesra usia. Kerajaan sedang membangunkan pemantauan penjagaan di rumah berkemampuan IoT dan perundingan perubatan maya untuk menyokong penuaan di tempat.",
        "Rang Undang-Undang Warga Emas yang akan datang dan Pelan Tindakan Kebangsaan untuk Warga Emas menunjukkan komitmen Malaysia terhadap kebajikan warga emas. Rancangan Malaysia Ke-13 (RMK13) akan mengambil pendekatan keseluruhan kerajaan yang memberi tumpuan kepada penjagaan jangka panjang, perlindungan sosial, dan pekerjaan fleksibel untuk warga emas."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'The Vibes. (2025). "Kerajaan mengutamakan populasi yang semakin tua dengan pendekatan holistik dalam RMK13"',
          'US Trade Gov. (2024). "Populasi Penuaan Penjagaan Kesihatan Malaysia"'
        ]
      }
    },
    {
      date: 'April 2025',
      title: 'Cabaran Penjagaan Kesihatan untuk Warga Emas Malaysia',
      paragraphs: [
        "Walaupun jangka hayat meningkat, jangka kesihatan tidak selari. Institut Penyelidikan Khazanah menganggarkan bahawa 9.5 tahun jangka hayat akan dihabiskan dalam keadaan kesihatan yang buruk disebabkan penyakit tidak berjangkit (NCD). Tiga daripada empat warga emas berusia 70+ mempunyai masalah kesihatan termasuk artritis, hipertensi, diabetes, dan komplikasi jantung.",
        "Sistem penjagaan kesihatan Malaysia, yang direka terutamanya untuk penjagaan akut, memerlukan penstrukturan semula untuk menangani pengurusan penyakit kronik dan keperluan penjagaan jangka panjang. Kekurangan pakar geriatrik dan perkhidmatan pemulihan menimbulkan cabaran yang ketara."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'Malaysian Journal of Medical Sciences. (2024). "Penuaan Sihat di Malaysia menjelang 2030"',
          'PMC. "Masalah dan Cabaran Populasi Penuaan Malaysia"'
        ]
      }
    },
    {
      date: 'Mac 2025',
      title: 'Integrasi Teknologi dalam Penjagaan Warga Emas',
      paragraphs: [
        "Gerontoteknologi—teknologi yang direka untuk keperluan warga emas—muncul sebagai penyelesaian penting. Perkhidmatan telekesihatan, peranti kesihatan boleh pakai, dan sistem pemantauan jarak jauh sedang merevolusikan penjagaan warga emas di Malaysia. Teknologi ini membolehkan pengenalpastian awal isu kesihatan, mengurangkan kemasukan hospital, dan menyokong kehidupan bebas.",
        "Teknologi rumah pintar, sistem pengurusan ubat, dan peranti respons kecemasan semakin penting dalam mengekalkan kebebasan warga emas sambil memastikan keselamatan dan pemantauan kesihatan."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'UNDP Malaysia. (2024). "Penyelesaian penjagaan warga emas berasaskan teknologi"',
          'US Trade Gov. (2024). "IoT dalam pemantauan penjagaan di rumah dan perundingan maya"'
        ]
      }
    },
    {
      date: 'Februari 2025',
      title: 'Penjagaan Keluarga dan Sokongan Komuniti',
      paragraphs: [
        "Penyelidikan menunjukkan 75% warga emas tinggal bersama ahli keluarga, 15% bersama pasangan, dan 10% bersendirian. Lebih daripada 70% rakyat Malaysia percaya adalah tugas generasi muda untuk menjaga ahli keluarga yang sudah tua, meletakkan beban yang besar kepada tenaga kerja yang semakin mengecil.",
        "Program sokongan berasaskan komuniti, pusat jagaan harian dewasa, dan perkhidmatan penjagaan rehat adalah penting untuk menyokong penjaga keluarga. Pembangunan dasar perumahan multigenerasi dan program penjagaan komuniti dapat mengukuhkan sistem penjagaan berasaskan keluarga."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'Malaysia Population Research Hub. "Statistik Populasi Warga Emas"',
          'Statista. (2024). "Bahagian populasi penuaan Malaysia 2015-2024"'
        ]
      }
    },
    {
      date: 'Januari 2025',
      title: 'Ketidaksamaan Serantau dalam Penjagaan Warga Emas',
      paragraphs: [
        "Perak mendahului dengan 14.9% populasi warga emas, diikuti Sarawak (13.4%) dan Kedah (13.3%). Dua puluh daerah mempunyai kepekatan warga emas tertinggi, termasuk Lubok Antu, Sarawak (21.8%), dan Sri Aman, Sarawak (18.7%). Kawasan luar bandar menghadapi cabaran yang lebih besar dengan akses terhad kepada kemudahan dan perkhidmatan penjagaan khusus.",
        "Kawasan bandar menawarkan akses penjagaan kesihatan dan kemudahan yang lebih baik, tetapi menghadapi kos yang lebih tinggi. Warga emas luar bandar sering bergantung lebih kepada sistem sokongan keluarga tradisional, yang semakin tertekan oleh corak urbanisasi dan migrasi."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'The Star. (2024). "Statistik populasi warga emas mengikut negeri dan daerah"',
          'DOSM. (2024). "Pelancaran Dashboard MyAgeing"'
        ]
      }
    },
    {
      date: 'Disember 2024',
      title: 'Tinjauan Pasaran dan Peluang Pelaburan',
      paragraphs: [
        "Pasaran penjagaan warga emas Malaysia bernilai USD 975.13 bilion pada 2024 dan diunjurkan mencapai USD 1,485.21 bilion menjelang 2032, dengan CAGR 5.40%. Pertumbuhan ini didorong oleh peningkatan permintaan untuk perkhidmatan penjagaan di rumah, kemudahan hidup berbantuan, dan peralatan perubatan khusus.",
        "Peluang pelaburan wujud dalam penyelesaian penjagaan berkemampuan teknologi, program latihan kakitangan, pembangunan kemudahan, dan model penyampaian perkhidmatan yang inovatif. Sektor ini mempunyai potensi yang besar untuk pelabur tempatan dan antarabangsa."
      ],
      references: {
        title: 'Rujukan:',
        items: [
          'Data Bridge Market Research. (2024). "Laporan Pasaran Penjagaan Warga Emas Malaysia"',
          'US Trade Gov. (2024). "Peluang untuk kampung warga emas dan peralatan perubatan"'
        ]
      }
    }
  ]
};

export default function BlogGrid({ language = 'en' }) {
  const articles = blogArticles[language] || blogArticles.en;

  return (
    <div className="blog-grid">
      {articles.map((article, index) => (
        <BlogCard
          key={index}
          date={article.date}
          title={article.title}
          paragraphs={article.paragraphs}
          references={article.references}
        />
      ))}
    </div>
  );
};