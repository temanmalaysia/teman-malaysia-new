import { useEffect, useRef } from 'react';
import { FaClock, FaGraduationCap, FaWallet, FaHandshake, FaHeart } from 'react-icons/fa';

const icons = {
  clock: <FaClock size={32} />,
  graduation: <FaGraduationCap size={32} />,
  wallet: <FaWallet size={32} />,
  handshake: <FaHandshake size={32} />,
  heart: <FaHeart size={32} />,
};

const benefits = [
  {
    icon: 'clock',
    title: 'Flexible Gig Opportunities',
    description: 'Caregiving with Teman Malaysia fits easily into your lifestyle, making it ideal for homemakers, students, new jobseekers, or anyone balancing other commitments. Select jobs according to your schedule.'
  },
  {
    icon: 'graduation',
    title: 'Training & Growth',
    description: "No prior experience? No problem. We provide training that equips you with practical caregiving skills and meaningful new experiences. Temanions also learn valuable practical lessons and skills on the job."
  },
  {
    icon: 'wallet',
    title: 'Weekly Payments',
    description: 'Your effort is valued — and rewarded on time. Caregivers receive weekly payments for services rendered.'
  },
  {
    icon: 'handshake',
    title: 'Long-Term Prospects',
    description: 'Many clients return to the caregivers they trust, creating opportunities for stable income and lasting bonds.'
  },
  {
    icon: 'heart',
    title: 'Meaningful Impact',
    description: 'Be part of a movement that transforms elderly care today — and builds a caring culture for our own future as we age.'
  }
];

export default function CareersWhyJoin() {
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
    <section className="careers-why-join section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section__header animate-on-scroll">
          <span className="section__tag">WHY CHOOSE US</span>
          <h2 className="section__title">Why Work with Teman Malaysia?</h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">
            Discover what makes Teman Malaysia a great place to build your career while making a meaningful impact
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="careers-why-join__grid animate-on-scroll">
          {benefits.map((benefit, index) => (
            <div className="benefit-card" key={index}>
              <div className="benefit-card__icon">
                {icons[benefit.icon]}
              </div>
              <h3 className="benefit-card__title">{benefit.title}</h3>
              <p className="benefit-card__description">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="careers-why-join__quote animate-on-scroll">
          <p>
            &quot;At Teman Malaysia, you&apos;re not just taking on a job — you&apos;re shaping lives, creating connections, and building a future where ageing with dignity is the norm. Join us and be the change.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};
