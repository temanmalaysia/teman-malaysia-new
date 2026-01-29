import Link from 'next/link';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function QuickContact() {
  return (
    <section className="quick-contact">
      <div className="container">
        <div className="quick-contact__content">
          <h3 className="quick-contact__title">Need Help Choosing?</h3>
          <p className="quick-contact__description">
            Our friendly team can help you select the best service for your needs.
          </p>

          <div className="quick-contact__options">
            <Link href="tel:+60139362705" className="quick-contact__btn">
              <FaPhoneAlt size={20} />
              Call Us Now
            </Link>

            <Link 
              href="https://wa.me/601156453964" 
              className="quick-contact__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} />
              WhatsApp
            </Link>

            <Link href="mailto:temanmalaysia@gmail.com" className="quick-contact__btn">
              <FaEnvelope size={20} />
              Email Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
