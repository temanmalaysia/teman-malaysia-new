import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  { value: 'Teman Health Appointments', label: 'Teman Health Appointments' },
  { value: 'Teman Customised Activity', label: 'Teman Customised Activity' },
  { value: 'Teman Dialysis Treatment', label: 'Teman Dialysis Treatment' },
  { value: 'Teman at Home', label: 'Teman at Home' },
  { value: 'General Inquiry', label: 'General Inquiry' },
  { value: 'Corporate Partnership', label: 'Corporate Partnership' },
  { value: 'Media Inquiry', label: 'Media Inquiry' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hide any existing messages
    setShowSuccess(false);
    setShowError(false);

    // Client-side validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setErrorText('Please fill in all required fields.');
      setShowError(true);
      setTimeout(() => setShowError(false), 8000);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorText('Please enter a valid email address.');
      setShowError(true);
      setTimeout(() => setShowError(false), 8000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/xvgqwbav', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          _subject: 'New Contact Form Submission - Teman Malaysia',
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setTimeout(() => setShowSuccess(false), 8000);
      } else {
        const data = await response.json();
        let errorMsg = 'There was an error sending your message. Please try again.';

        if (data.errors) {
          const errors = data.errors.map((error) => error.message).join(', ');
          errorMsg = `Validation error: ${errors}`;
        } else if (data.error) {
          errorMsg = data.error;
        }

        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorText(error.message);
      setShowError(true);
      setTimeout(() => setShowError(false), 8000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-form">
      <div className="container">
        <div className="contact-form__grid">
          {/* Left Side - Content */}
          <div className="contact-form__content">
            <span className="contact-form__tag">SEND MESSAGE</span>
            <h3 className="contact-form__title">Send Us a Message</h3>
            <p className="contact-form__description">
              Fill out the form and we&apos;ll get back to you as soon as possible. 
              Our team is ready to assist you with any questions about our services.
            </p>

            {/* Business Hours */}
            <div className="contact-form__hours">
              <h4 className="contact-form__hours-title">
                <i className="fas fa-clock"></i> Business Hours
              </h4>
              <div className="contact-form__hours-card">
                <div className="contact-form__hours-label">Office Hours</div>
                <div className="contact-form__hours-time">
                  Monday – Friday: 09:00 AM – 06:00 PM
                </div>
                <div className="contact-form__hours-desc">
                  General inquiries and consultations
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form__form-container">
            {/* Success Message */}
            {showSuccess && (
              <div className="contact-form__message contact-form__message--success">
                <i className="fas fa-check-circle"></i>
                Thank you for your message! We&apos;ll get back to you within 24 hours.
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div className="contact-form__message contact-form__message--error">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{errorText}</span>
              </div>
            )}

            <form className="contact-form__form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="name" className="contact-form__label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="contact-form__input"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email" className="contact-form__label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-form__input"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="phone" className="contact-form__label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="contact-form__input"
                    placeholder="+60 12-345 6789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="service" className="contact-form__label">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="contact-form__select"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="message" className="contact-form__label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact-form__textarea"
                  placeholder="Tell us about your needs, preferred schedule, or any specific requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn btn--primary btn--full btn--large ${isLoading ? 'btn--loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading && <span className="contact-form__spinner"></span>}
                <FaPaperPlane size={20} />
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};