import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 0,
    text: 'Sekarang saya mempunyai peneman untuk membantu saya ke pasar dan membawa saya kesana sini.',
    name: 'Hjh. Najihah',
    role: 'Bekas Guru Sekolah Agama',
  },
  {
    id: 1,
    text: 'Saya tidak dapat meneman ibu saya hari ini kerana kekangan masa. Servis ini sangat bermanfaat untuk anak-anak yang bekerja sepenuh masa dan tidak sentiasa dapat untuk menjaga ibu bapa mereka.',
    name: 'Yazmin Kadir',
    role: 'Working Mother',
  },
  {
    id: 2,
    text: 'Bagus dan bermanfaat untuk komuniti kita. Bagusnya jika dapat diluaskan lagi di kawasan luar bandar.',
    name: 'Puan Badariah',
    role: 'Community Member',
  },
];

export default function Testimony() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const totalTestimonials = testimonials.length;

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % totalTestimonials);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalTestimonials]);

  const showTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const changeTestimonial = (direction) => {
    const newIndex = currentTestimonial + direction;
    if (newIndex >= 0 && newIndex < totalTestimonials) {
      setCurrentTestimonial(newIndex);
    }
  };

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <span className="section__tag">TESTIMONIAL</span>
          <h2 className="section__title">From Our Clients</h2>
          <div className="section__divider"></div>
        </div>

        {/* Testimonials */}
        <div className="testimonials__simple">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial__item ${currentTestimonial === index ? 'active' : ''}`}
            >
              <div className="testimonial__card">
                <div className="testimonial__quote">&ldquo;</div>
                <p className="testimonial__text">{testimonial.text}</p>
                <div className="testimonial__author">
                  <h4 className="testimonial__name">{testimonial.name}</h4>
                  <p className="testimonial__role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="testimonials__navigation">
          <button
            className="testimonial__btn testimonial__btn--prev"
            onClick={() => changeTestimonial(-1)}
            disabled={currentTestimonial === 0}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="testimonials__indicators">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`testimonial__indicator ${currentTestimonial === index ? 'active' : ''}`}
                onClick={() => showTestimonial(index)}
              />
            ))}
          </div>

          <button
            className="testimonial__btn testimonial__btn--next"
            onClick={() => changeTestimonial(1)}
            disabled={currentTestimonial === totalTestimonials - 1}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
