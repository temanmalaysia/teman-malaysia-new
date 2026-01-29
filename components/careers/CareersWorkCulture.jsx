import { useEffect, useRef } from 'react';
import Image from 'next/image';

const cultureFeatures = [
  'Open communication and feedback',
  'Team collaboration and support',
  'Respect for individual contributions',
  'Continuous learning opportunities',
  'Work-life balance emphasis',
  'Inclusive and diverse environment'
];

export default function CareersWorkCulture() {
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
    <section className="careers-work-culture section" ref={sectionRef}>
      <div className="container">
        <div className="careers-work-culture__grid animate-on-scroll">
          {/* Content Column */}
          <div className="careers-work-culture__content">
            <h3 className="careers-work-culture__title">Our Work Culture</h3>
            <p className="careers-work-culture__text">
              At Teman Malaysia, we foster an environment where every team member feels valued, supported, and empowered to make a difference. Our culture is built on collaboration, respect, and shared commitment to our mission.
            </p>

            <ul className="careers-work-culture__features">
              {cultureFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Image Column */}
          <div className="careers-work-culture__image">
            <Image src="/img/teman-work.jpg" alt="Teman Malaysia team culture" width={1200} height={800} />
          </div>
        </div>
      </div>
    </section>
  );
};
