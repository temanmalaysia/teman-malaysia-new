import Image from "next/image";

export default function About() {
    return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__grid">
          {/* Images */}
          <div className="about__images">
            <div className="about__image about__image--1">
              <Image
                src="/img/memory-1.jpg"
                alt="Teman Malaysia freelancer driving car"
                width={300}
                height={200}
                className="about__img"
              />
            </div>
            <div className="about__image about__image--2">
              <Image
                src="/img/memory-4.jpg"
                alt="Teman Malaysia freelancer with elderly women"
                width={300}
                height={180}
                className="about__img"
              />
            </div>
          </div>

          {/* Content */}
          <div className="about__content">
            <div className="section__header">
              <span className="section__tag">ABOUT US</span>
              <h2 className="section__title">Caring companion for your loved ones.</h2>
              <div className="section__divider"></div>
            </div>

            <div className="about__text">
              <p>
                We provide care companionship services to improve your loved one&apos;s quality of life and ensure the right level of care is always there for them.
              </p>
              <p>
                <strong>We believe the elderly are empowered with confidence to maintain active and independent with the reassurance and a helping hand from others.</strong>
              </p>
              <p>
                Teman Malaysia offers a safe experience by providing guardians&apos; updates on their loved ones&apos; whereabouts and activities.
              </p>
              <p>
                We will match our customers with our Temanions to perform varied activities such as daily chores, attend appointments, or enjoy their free time through a library of curated activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}