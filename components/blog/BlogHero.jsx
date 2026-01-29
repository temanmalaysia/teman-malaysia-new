import { useState } from 'react';

export default function BlogHero({ onLanguageChange }) {
  const [activeLanguage, setActiveLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setActiveLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <section className="blog-hero">
      <div className="blog-hero__background"></div>
      <div className="container">
        <h1 className="blog-hero__title">Elderly Care Malaysia</h1>
        <h2 className="blog-hero__subtitle">Penjagaan Warga Emas Malaysia</h2>
        <p className="blog-hero__description">
          Comprehensive resources and insights for elderly care in Malaysia - 
          bridging families, communities, and quality care services
        </p>

        <div className="blog-hero__language-toggle">
          <button
            className={`blog-hero__lang-btn ${activeLanguage === 'en' ? 'blog-hero__lang-btn--active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`blog-hero__lang-btn ${activeLanguage === 'ms' ? 'blog-hero__lang-btn--active' : ''}`}
            onClick={() => handleLanguageChange('ms')}
          >
            Bahasa Melayu
          </button>
        </div>
      </div>
    </section>
  );
};