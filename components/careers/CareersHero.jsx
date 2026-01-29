import { useEffect, useRef } from 'react';

export default function CareersHero() {
  const heroRef = useRef(null);

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

    const element = heroRef.current?.querySelector('.animate-on-scroll');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="careers-hero" ref={heroRef}>
      <div className="careers-hero__overlay"></div>
      <div className="container">
        <div className="careers-hero__content animate-on-scroll">
          <h1 className="careers-hero__title">Start Your Career with Teman Malaysia</h1>
          <p className="careers-hero__subtitle">
            Join us on an incredibly rewarding mission that makes a real difference in people&apos;s lives.
          </p>
        </div>
      </div>
    </section>
  );
};