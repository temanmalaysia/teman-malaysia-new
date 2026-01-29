import Link from 'next/link';
import { FaArrowLeft, FaStethoscope, FaHeartbeat, FaUsers, FaHome, FaCheck } from 'react-icons/fa';

const icons = {
  health: <FaStethoscope size={24} />,
  dialysis: <FaHeartbeat size={24} />,
  customActivities: <FaUsers size={24} />,
  homePackage: <FaHome size={24} />,
};

export default function BookingHero({
  theme = 'health',
  pageTitle,
  pageSubtitle,
  cardTitle,
  cardDescription,
  features = [],
  featuresTitle = null, // Optional title for features box (used by homePackage)
  backLink = '/booking',
  backText = 'Back to Services',
}) {
  const classNames = [
    'booking-hero',
    theme ? `booking-hero--${theme}` : ''
  ].filter(Boolean).join(' ');

  // Determine if features should be in a box (when featuresTitle is provided)
  const hasFeaturesBox = featuresTitle !== null;

  return (
    <section className={classNames}>
      <div className="container">
        {/* Back Link */}
        <Link href={backLink} className="booking-hero__back-link">
          <FaArrowLeft size={16} />
          {backText}
        </Link>

        {/* Page Header */}
        <div className="booking-hero__header">
          <h1 className="booking-hero__title">{pageTitle}</h1>
          <p className="booking-hero__subtitle">{pageSubtitle}</p>
        </div>

        {/* Service Information Card */}
        <div className="booking-hero__card">
          <div className="booking-hero__card-header">
            <div className="booking-hero__icon">
              {icons[theme] || icons.health}
            </div>
            <h2 className="booking-hero__card-title">{cardTitle}</h2>
          </div>
          
          <p className="booking-hero__card-description">{cardDescription}</p>

          {features.length > 0 && !hasFeaturesBox && (
            <div className="booking-hero__features">
              {features.map((feature, index) => (
                <div key={index} className="booking-hero__feature">
                  <FaCheck size={12} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {features.length > 0 && hasFeaturesBox && (
            <div className="booking-hero__features-box">
              <h3 className="booking-hero__features-box-title">{featuresTitle}</h3>
              <div className="booking-hero__features-box-grid">
                {features.map((feature, index) => (
                  <div key={index} className="booking-hero__feature">
                    <FaCheck size={12} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
