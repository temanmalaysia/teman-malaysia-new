import { useEffect, useRef } from 'react';
import { FaGraduationCap, FaRoad, FaUsers } from 'react-icons/fa';

const icons = {
  graduation: <FaGraduationCap size={32} />,
  users: <FaUsers size={32} />,
  road: <FaRoad size={32} />,
};

const offers = [
  {
    icon: 'graduation',
    title: 'Training & Community: The Teman Difference',
    description: 'Discover how our training programs and supportive community set you apart — giving you the confidence, skills, and connection to thrive as a caregiver.'
  },
  {
    icon: 'users',
    title: 'Training & Community: The Teman Promise',
    description: 'At Teman Malaysia, we promise more than a job — we offer training, teamwork, and ongoing support to help you grow with purpose.'
  },
  {
    icon: 'road',
    title: 'Training & Community: The Teman Pathway',
    description: 'Your journey as a caregiver begins here. With comprehensive training and a strong community behind you, Teman is your pathway to a meaningful career.'
  }
];

export default function CareersWhatWeOffer() {
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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="careers-what-we-offer section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section__header animate-on-scroll">
          <span className="section__tag">WHAT WE PROVIDE</span>
          <h2 className="section__title">What We Bring to You</h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">
            We believe in supporting our team members with comprehensive benefits and opportunities
          </p>
        </div>

        {/* Offers Grid */}
        <div className="careers-what-we-offer__grid animate-on-scroll">
          {offers.map((offer, index) => (
            <div className="offer-item" key={index}>
              <div className="offer-item__icon">
                {icons[offer.icon]}
              </div>
              <h4 className="offer-item__title">{offer.title}</h4>
              <p className="offer-item__description">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};