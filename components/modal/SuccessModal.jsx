import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';

// ===========================================
// SUCCESS MODAL COMPONENT
// ===========================================
export default function SuccessModal({
  isOpen,
  onClose,
  bookingRef,
  theme = 'health',
  paymentUrl = 'https://www.billplz.com/deposit4Teman',
  autoRedirect = true,
  redirectDelay = 2000,
}) {
  // Handle ESC key to close modal
  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Auto-open payment page after delay
  useEffect(() => {
    if (isOpen && autoRedirect) {
      const timer = setTimeout(() => {
        window.open(paymentUrl, '_blank');
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoRedirect, paymentUrl, redirectDelay]);

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`success-modal success-modal--${theme}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div 
        className="success-modal__backdrop" 
        onClick={handleBackdropClick}
      >
        <div className="success-modal__content">
        {/* Success Icon */}
        <div className="success-modal__icon">
          <FaCheckCircle size={64} />
        </div>

        {/* Title */}
        <h2 id="success-modal-title" className="success-modal__title">
          Thank You!
        </h2>

        {/* Message */}
        <p className="success-modal__message">
          We&apos;ve received your booking request and will contact you within 24 hours to
          confirm the details.
        </p>

        {/* Payment Link */}
        <p className="success-modal__message">
          To complete your deposit payment, please proceed to our secure payment gateway:
          <Link
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="success-modal__link"
          >
            {' '}Click here to make your payment
          </Link>
        </p>

        {/* Booking Reference */}
        {bookingRef && (
          <div className="success-modal__reference">
            <strong>Reference Number: {bookingRef}</strong>
          </div>
        )}

        {/* Action Buttons */}
        <div className="success-modal__actions">
          <Link href="/booking" className="btn btn--primary">
            Book Another Service
          </Link>
          <button 
            type="button" 
            className="btn btn--outline" 
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      </div>
    </div>
  );

  // Use portal to render modal at document root
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
};
