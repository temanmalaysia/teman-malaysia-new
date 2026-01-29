import { useEffect, useRef } from 'react';

export default function CareersMission() {
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
    <section className="careers-mission section" ref={sectionRef}>
      <div className="container">
        <div className="careers-mission__content animate-on-scroll">
          <p className="careers-mission__text">
            At Teman Malaysia, we strive to create a positive impact in empowering seniors and adults with disabilities with the support they need. For us, it serves as the cornerstone for all we do rather than just being a bonus.
          </p>
          <p className="careers-mission__text">
            We are looking for individuals who are as driven as we are to improve the quality of life for those we serve. This could be you.
          </p>
        </div>
      </div>
    </section>
  );
};