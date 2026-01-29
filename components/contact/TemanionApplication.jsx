import { FaUserPlus } from 'react-icons/fa';

export default function TemanionApplication() {
  return (
    <section className="temanion-application section">
      <div className="container">
        <div className="temanion-application__content">
          <h2 className="temanion-application__title">
            Interested in Becoming a Temanion?
          </h2>
          <p className="temanion-application__subtitle">
            Join our team of caring companions and make a difference in someone&apos;s life. 
            Apply today to become a certified Temanion.
          </p>
          <button
            type="button"
            className="btn btn--dark btn--large"
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeYrTwvKfJzbkAEDQbBDMMENRgYSLVwF3Pq3e9Ktad83apnGg/viewform', '_blank', 'noopener,noreferrer')}
            aria-label="Apply to Become a Temanion"
          >
            <FaUserPlus size={20} />
            Apply to Become a Temanion
          </button>
        </div>
      </div>
    </section>
  );
};
