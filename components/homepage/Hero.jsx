import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCalendarCheck } from 'react-icons/fa';
import AuthModal from '@/components/modal/AuthModal';

const services = [
  {
    id: 'appointment-package',
    tab: 'Appointment Aid',
    title: 'TEMAN Health Appointments',
    description: 'Professional companionship and safe transport for a wide range of medical appointments.',
    image: '/img/memory-3.jpg',
    featuresTitle: 'Service Options:',
    features: [
      'Professional medical appointment assistant',
      'Transportation assistance available',
      'Flexible scheduling options',
    ],
    link: '/booking/health-appointments',
  },
  {
    id: 'dialysis-package',
    tab: 'Dialysis Treatment',
    title: 'TEMAN to Dialysis Treatments',
    description: 'Reliable escort to regular dialysis sessions, including specialised care and transport.',
    image: '/img/memory-8.jpg',
    featuresTitle: 'Service Options:',
    features: [
      'Safe transportation to/from dialysis center',
      'Emotional support throughout process',
      'Flexible scheduling for regular treatments',
    ],
    link: '/booking/dialysis',
  },
  {
    id: 'activity-package',
    tab: 'Activity Companion',
    title: 'TEMAN Customised Activities',
    description: 'Personalised companionship and assistance for social outings, leisure activities, or daily errands.',
    image: '/img/memory-2.jpg',
    featuresTitle: 'Activities Include:',
    features: [
      'Shopping & errands',
      'Social activities & outings',
      'Recreational activities',
      'Bank or administrative appointments',
      'Exercise and fitness activities',
      'Customised to your preferences',
    ],
    link: '/booking/custom-activities',
  },
  {
    id: 'home-package',
    tab: 'At Home Partner',
    title: 'TEMAN at Home Package',
    description: 'Long-term day care services offering support with daily tasks, and a reassuring presence in your home comfort.',
    image: '/img/memory-7.jpg',
    featuresTitle: 'Services Include:',
    features: [
      'Feeding/prepare meals',
      'Light physiotherapy',
      'Companionship & mind wellness',
      'Bathing/personal care',
      'Outdoor exercise/activities',
      'And Others',
    ],
    link: '/booking/home-package',
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = services[activeTab];
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  const [pendingHref, setPendingHref] = useState(null);

  const handleBookNow = () => {
    const href = activeService.link;
    const loggedIn =
      typeof window !== 'undefined' && localStorage.getItem('tm_signed_in') === '1';
    if (!loggedIn) {
      setPendingHref(href);
      setShowAuth(true);
      return;
    }
    router.push(href);
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        {/* Hero Content */}
        <div className="hero__content">
          <h1 className="hero__title">
            Care You Can Trust, A Teman They Deserve.
          </h1>
          <p className="hero__subtitle">
            Care companions you can rely on, supporting all needs for a healthy ageing journey
          </p>
        </div>

        {/* Service Package Tabs */}
        <div className="service-package-tabs">
          <div className="service-package-tabs__header">
            <h2 className="service-package-tabs__title">Our Personalised Care Solutions</h2>
            <p className="service-package-tabs__subtitle">Choose the perfect service for your loved ones</p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            {services.map((service, index) => (
              <button
                key={service.id}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {service.tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content active">
            <div className="service-package-card">
              <div className="service-package-card__image-wrapper">
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  width={500}
                  height={200}
                  className="service-package-card__image"
                />
              </div>
              <div className="service-package-card__content">
                <h3 className="service-package-card__title">{activeService.title}</h3>
                <p className="service-package-card__description">{activeService.description}</p>

                <div className="service-package-card__features">
                  <h4>{activeService.featuresTitle}</h4>
                  <div className="feature-grid">
                    {activeService.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-package-card__action">
                  <button 
                    onClick={handleBookNow} 
                    className="service-package-card__book-btn"
                  >
                    <FaCalendarCheck size={16} />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode="signin"
        onSuccess={() => {
          const target = pendingHref;
          setShowAuth(false);
          setPendingHref(null);
          if (target) router.push(target);
        }}
      />
      </div>
    </section>
  );
}
