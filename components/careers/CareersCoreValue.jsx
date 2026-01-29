import { useEffect, useRef } from 'react';
import { FaBalanceScale, FaHandshake, FaStar, FaUsers, FaUserShield } from 'react-icons/fa';

const icons = {
  integrity: <FaUserShield size={32} />,
  handshake: <FaHandshake size={32} />,
  balance: <FaBalanceScale size={32} />,
  users: <FaUsers size={32} />,
  star: <FaStar size={32} />,
};

const values = [
  {
    icon: 'integrity',
    title: 'Integrity',
    description: 'We adhere to our moral and ethical standards when providing our services, keep our promises, and communicate honestly and openly.'
  },
  {
    icon: 'handshake',
    title: 'Approachable',
    description: "We create strong bonds with one another and a cohesive workplace through open communication, accessibility, empathy, and genuine interest in others' well-being."
  },
  {
    icon: 'balance',
    title: 'Accountable',
    description: 'We value each other\'s contributions to furthering the mission and take responsibility for our words, deeds, triumphs, and failures.'
  },
  {
    icon: 'users',
    title: 'Collaborative',
    description: 'Together we achieve outcomes by building on one other\'s skills, encouraging innovative approaches, and executing our mission effectively.'
  },
  {
    icon: 'star',
    title: 'Authentic',
    description: 'We are genuine and honest with others and ourselves. We encourage self-expression and ensure each person\'s true self is valued and respected.'
  }
];

export default function CareersCoreValues() {
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
    <section className="careers-core-values section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section__header animate-on-scroll">
          <span className="section__tag">OUR FOUNDATION</span>
          <h2 className="section__title">What We Look For</h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">
            These values guide everything we do and represent what we seek in our team members
          </p>
        </div>

        {/* Values Grid */}
        <div className="careers-core-values__grid animate-on-scroll">
          {values.map((value, index) => (
            <div className="value-card" key={index}>
              <h3 className="value-card__title">
                <i className={value.icon}>{icons[value.icon]}</i>
                {value.title}
              </h3>
              <p className="value-card__description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};