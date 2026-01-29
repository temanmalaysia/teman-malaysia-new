import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaRegClock, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__grid">
            <div className="footer__section footer__brand">
              <Image src="/img/teman-logo.png" alt="Teman Malaysia" className="footer__logo" width={150} height={40} />
            </div>

            <div className="footer__section footer__office">
              <h4 className="footer__title">Office Information</h4>
              <div className="footer__divider" />

              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt />
                  <span>Common Ground, Level 1 & 2, Tower 3, Avenue 7 Horizon 2, Bangsar South City, 59200 Kuala Lumpur, MY</span>
                </div>

                <div className="contact-item">
                  <FaRegClock />
                  <span>Monday – Friday, 09:00 AM – 06:00 PM</span>
                </div>

                <div className="contact-item">
                  <FaPhoneAlt />
                  <span>+60 11-5645 3964 (WhatsApp ONLY)</span>
                </div>

                <div className="contact-item">
                  <FaEnvelope />
                  <span>temanmalaysia@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="footer__section footer__social">
              <h4 className="footer__title">Connect With Us</h4>
              <div className="footer__divider" />

              <p className="footer__social-text">Follow us on social media for updates and community engagement.</p>

              <div className="social-links" data-testid="footer-social-links">
                <Link href="https://www.facebook.com/temanmalaysia/" className="social-link" target="_blank" rel="noopener" aria-label="Facebook">
                  <FaFacebookF />
                </Link>
                <Link href="https://www.instagram.com/temanmalaysia/" className="social-link" target="_blank" rel="noopener" aria-label="Instagram">
                  <FaInstagram />
                </Link>
                <Link href="https://www.youtube.com/channel/UCCrRZXahxF-q7xWin-_kY0g" className="social-link" target="_blank" rel="noopener" aria-label="YouTube">
                  <FaYoutube />
                </Link>
                <Link href="https://wa.me/601156453964" className="social-link" target="_blank" rel="noopener" aria-label="WhatsApp">
                  <FaWhatsapp />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>© 2025 Teman My Ventures PLT (LLP0025510-LGN)</p>
          </div>

          <div className="footer__legal">
            <ul className="legal__list">
              <li>
                <Link href="/terms">Terms of Use</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
