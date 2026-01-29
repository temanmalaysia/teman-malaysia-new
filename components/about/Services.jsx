import Image from 'next/image';

export default function Services() {
  return (
    <section className="about about--page section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section__header animate-on-scroll">
          <span className="section__tag">About Our Service</span>
          <h2 className="section__title">How Teman Malaysia Works</h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">
            Connecting caring companions with those who need support through our innovative platform
          </p>

          {/* Process Flow */}
          <div className="about__process animate-on-scroll">
            <Image
              src="/img/process-icon-1.png"
              alt="Step 1"
              width={100}
              height={100}
              className="about__process-icon"
            />
            <Image
              src="/img/process-plus.png"
              alt="Plus"
              width={30}
              height={30}
              className="about__process-connector"
            />
            <Image
              src="/img/process-icon-2.png"
              alt="Step 2"
              width={100}
              height={100}
              className="about__process-icon"
            />
            <Image
              src="/img/process-equals.png"
              alt="Equals"
              width={30}
              height={30}
              className="about__process-connector"
            />
            <Image
              src="/img/process-icon-3.png"
              alt="Result"
              width={100}
              height={100}
              className="about__process-icon"
            />
            <Image
              src="/img/process-icon-4.png"
              alt="Result"
              width={100}
              height={100}
              className="about__process-icon"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="about__cards">
          <div className="about__card animate-on-scroll">
            <h3 className="about__card-title">How It Works</h3>
            <p className="about__card-text">
              Our platform seamlessly connects customers with qualified Temanions who are matched based on specific needs and preferences. Temanions provide assistance with daily tasks, accompany clients to appointments, run errands, and engage in meaningful activities that enhance quality of life.
            </p>
          </div>

          <div className="about__card animate-on-scroll">
            <h3 className="about__card-title">Meet Our Temanions</h3>
            <p className="about__card-text">
              Temanions are passionate, caring Malaysians who serve as professional care companions. The name creatively combines the Malay word <strong>&quot;teman&quot;</strong> (friend) with <strong>&quot;companion&quot;</strong>, reflecting our commitment to providing genuine friendship alongside professional care services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};