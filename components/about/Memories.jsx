import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const memoriesData = [
  {
    src: '/img/memory-1.jpg',
    alt: 'Temanion helping elderly with activities',
    caption: 'Temanion helping with daily activities'
  },
  {
    src: '/img/memory-2.jpg',
    alt: 'Elderly enjoying time with companion',
    caption: 'Enjoying quality time together'
  },
  {
    src: '/img/memory-3.jpg',
    alt: 'Medical appointment assistance',
    caption: 'Assistance with medical appointments'
  },
  {
    src: '/img/memory-4.jpg',
    alt: 'Outdoor activities with elderly',
    caption: 'Outdoor activities and exercise'
  },
  {
    src: '/img/memory-5.JPG',
    alt: 'Reading together',
    caption: 'Reading and learning together'
  },
  {
    src: '/img/memory-6.JPG',
    alt: 'Cooking together',
    caption: 'Cooking and meal preparation'
  }
];

export default function Memories() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  // Handle manual navigation
  const scrollCarousel = (direction) => {
    if (trackRef.current) {
      const slideWidth = trackRef.current.querySelector('.memories__slide')?.offsetWidth || 300;
      const scrollAmount = direction === 'next' ? slideWidth + 16 : -(slideWidth + 16);
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="memories section">
      <div className="container">
        <div className="memories__grid">
          {/* Content */}
          <div className="memories__content animate-on-scroll">
            <h2 className="memories__title">Some of Our Memories</h2>
            <div className="memories__divider"></div>
            <p className="memories__text">
              We appreciate everyone&apos;s involvement, and we thank you for your continued support.
              <br /><br />
              Terima kasih!
            </p>
          </div>

          {/* Carousel */}
          <div className="memories__carousel-wrapper animate-on-scroll">
            <div 
              className="memories__carousel"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Navigation Buttons */}
              <button 
                className="memories__nav memories__nav--prev"
                onClick={() => scrollCarousel('prev')}
                aria-label="Previous slide"
              >
                <FiChevronLeft size={20} />
              </button>
              <button 
                className="memories__nav memories__nav--next"
                onClick={() => scrollCarousel('next')}
                aria-label="Next slide"
              >
                <FiChevronRight size={20} />
              </button>

              {/* Carousel Track */}
              <div 
                ref={trackRef}
                className={`memories__track ${isPaused ? 'memories__track--paused' : ''}`}
              >
                {/* Original slides */}
                {memoriesData.map((memory, index) => (
                  <div key={index} className="memories__slide">
                    <Image
                      src={memory.src}
                      alt={memory.alt}
                      width={300}
                      height={300}
                      className="memories__image"
                    />
                    <div className="memories__overlay">
                      <span className="memories__caption">{memory.caption}</span>
                    </div>
                  </div>
                ))}
                {/* Duplicated slides for seamless loop */}
                {memoriesData.slice(0, 3).map((memory, index) => (
                  <div key={`dup-${index}`} className="memories__slide">
                    <Image
                      src={memory.src}
                      alt={memory.alt}
                      width={300}
                      height={300}
                      className="memories__image"
                    />
                    <div className="memories__overlay">
                      <span className="memories__caption">{memory.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
