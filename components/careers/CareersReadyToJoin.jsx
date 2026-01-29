import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CareersReadyToJoin({ 
  title = "Ready to Make an Impact?",
  subtitle = "If you'd like to help us live out our mission and be part of something meaningful, we'd love to hear from you.",
  buttonText = "Apply Now!",
  buttonLink = "https://docs.google.com/forms/d/e/1FAIpQLSeYrTwvKfJzbkAEDQbBDMMENRgYSLVwF3Pq3e9Ktad83apnGg/viewform"
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const element = sectionRef.current?.querySelector('.animate-on-scroll');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="careers-ready-to-join section" ref={sectionRef}>
      <div className="container">
        <div className="careers-ready-to-join__content animate-on-scroll">
          <h2 className="careers-ready-to-join__title">{title}</h2>
          <p className="careers-ready-to-join__subtitle">{subtitle}</p>
          <Link 
            href={buttonLink} 
            className="btn btn--dark btn--large"
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};
