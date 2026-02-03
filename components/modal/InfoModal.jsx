import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

export default function InfoModal({ isOpen, onClose, title = 'Booking Notice', message = '', theme = 'health' }) {
  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const whatsappTextMap = {
    health: "Hello Teman! I'm interested to book for a Teman for my health appointments.",
    dialysis: "Hello Teman! I'm interested to book for a Teman for my dialysis treatments.",
    customActivities: "Hello Teman! I'm interested to book for a Teman for customised activities.",
    homePackage: "Hello Teman! I'm interested to book the Teman at Home Package.",
  };
  const whatsappHref = `https://wa.me/601156453964?text=${encodeURIComponent(whatsappTextMap[theme] || "Hello Teman! I'm interested to make a booking.")}`;

  const modalContent = (
    <div
      className={`success-modal success-modal--${theme} success-modal--notice`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      data-testid="booking-notice-modal"
    >
      <div className="success-modal__backdrop" onClick={handleBackdropClick}>
        <div className="success-modal__content">
          <h2 id="success-modal-title" className="success-modal__title">{title}</h2>
          <p className="success-modal__message">{message}</p>
          <div className="success-modal__actions">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              aria-label="WhatsApp Us Now"
              data-testid="notice-whatsapp-btn"
            >
              WhatsApp Us Now!
            </Link>
            <button type="button" className="btn btn--outline" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
