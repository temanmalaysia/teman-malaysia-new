import { useState, useEffect, useRef } from 'react';
import { FiClock, FiUsers, FiHeart } from 'react-icons/fi';

const statsData = [
  {
    icon: <FiClock />,
    number: 53029,
    label: 'Services Hours Delivered'
  },
  {
    icon: <FiUsers />,
    number: 565,
    label: 'Unique Customers'
  },
  {
    icon: <FiHeart />,
    number: 368,
    label: 'Temanions'
  }
];

export default function Stats() {
  const [counters, setCounters] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    statsData.forEach((stat, index) => {
      const target = stat.number;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.floor(increment * step), target);
        
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = current;
          return newCounters;
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = target;
            return newCounters;
          });
        }
      }, duration / steps);
    });
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section className="stats section" ref={sectionRef}>
      <div className="container">
        <div className="stats__grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stats__card animate-on-scroll">
              <div className="stats__icon">
                {stat.icon}
              </div>
              <div className="stats__number">{formatNumber(counters[index])}</div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="stats__update">
          <p>Last update: August 2025</p>
        </div>
      </div>
    </section>
  );
};
