import Link from 'next/link';
import { useState } from 'react';
import InfoModal from '@/components/modal/InfoModal';
import { FaStethoscope, FaHeartbeat, FaUsers, FaHome, FaCheck, FaArrowRight } from 'react-icons/fa';

const icons = {
  stethoscope: <FaStethoscope size={24} />,
  heartbeat: <FaHeartbeat size={24} />,
  users: <FaUsers size={24} />,
  home: <FaHome size={24} />,
};

// Service card data (different from BookingHeroData - these are for the cards before clicking)
const servicesData = [
  {
    id: 'health-appointments',
    href: '/booking/health-appointments',
    icon: 'stethoscope',
    theme: 'health',
    title: 'TEMAN Health Appointments',
    description: 'Professional assistance for medical checkups and treatments with caring companionship.',
    features: [
      'Accompaniment to medical appointments',
      'Assistance with mobility and transportation',
      'Help with paperwork and communication',
      'Emotional support during visits',
    ],
    pricing: {
      price: 'From RM35/hour',
      notes: [
        'Minimum 2 hours booking',
        'Package deals available',
      ],
    },
    ctaText: 'Book Health Appointment Support',
  },
  {
    id: 'dialysis',
    href: '/booking/dialysis',
    icon: 'heartbeat',
    theme: 'dialysis',
    title: 'TEMAN to Dialysis Treatments',
    description: 'Specialized support for dialysis sessions with understanding and experienced companions.',
    features: [
      'Transportation to dialysis center',
      'Companionship during treatment',
      'Assistance with mobility',
      'Support for multiple sessions',
    ],
    pricing: {
      price: 'From RM35/hour',
      notes: [
        'Package for 3 sessions: RM186',
        'Companion service: +RM30/hour',
        'Unused hours valid for 30 days',
      ],
    },
    ctaText: 'Book Dialysis Support',
  },
  {
    id: 'custom-activities',
    href: '/booking/custom-activities',
    icon: 'users',
    theme: 'customActivities',
    title: 'TEMAN Customised Activities',
    description: 'Personalized companionship for leisure activities, social outings, and recreational pursuits.',
    features: [
      'Shopping and errands assistance',
      'Social outings and recreational activities',
      'Park visits and outdoor exercises',
      'Cultural and entertainment events',
      'Customized activity planning',
    ],
    pricing: {
      price: 'From RM35/hour',
      notes: [
        'Minimum 2 hours booking',
        'Flexible activity planning',
      ],
    },
    ctaText: 'Book Custom Activities',
  },
  {
    id: 'home-package',
    href: '/booking/home-package',
    icon: 'home',
    theme: 'homePackage',
    title: 'TEMAN at Home Package',
    description: 'Comprehensive day care services providing assistance with daily activities in the comfort of home.',
    features: [
      'Medication dispensing and reminders',
      'Meal preparation and feeding assistance',
      'Light physiotherapy & exercises',
      'Personal care and hygiene assistance',
      'Companionship and wellness activities',
    ],
    pricing: {
      price: 'From RM2,800',
      notes: [
        '4-8 hours/day, 20 sessions',
      ],
    },
    ctaText: 'Book Home Care Package',
  },
];

// Icon component
const ServiceIcon = ({ icon }) => {
  return icons[icon] || null;
};

export default function ServicesGrid() {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeTheme, setNoticeTheme] = useState('health');
  const message = "We’re working on fixing a technical issue with our website. In the meantime, for any booking inquiries, please contact us directly through WhatsApp. We appreciate your patience.";
  return (
    <section className="services-grid-section">
      <div className="container">
        <div className="services-grid">
          {servicesData.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className={`service-card service-card--${service.theme}`}
              onClick={(e) => { e.preventDefault(); setNoticeOpen(true); setNoticeTheme(service.theme); }}
              data-testid={`service-card-${service.id}`}
            >
              <div className="service-card__header">
                <div className="service-card__icon">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
              </div>

              <p className="service-card__description">{service.description}</p>

              <div className="service-card__features">
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <FaCheck size={12} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card__pricing">
                <div className="service-card__pricing-title">Pricing Options:</div>
                <div className="service-card__price">{service.pricing.price}</div>
                {service.pricing.notes.map((note, index) => (
                  <div key={index} className="service-card__pricing-note">• {note}</div>
                ))}
              </div>

              <div className="service-card__cta">
                <span className="service-card__cta-text">{service.ctaText}</span>
                <FaArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <InfoModal
        isOpen={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        title="Booking Notice"
        message={message}
        theme={noticeTheme}
      />
    </section>
  );
}
