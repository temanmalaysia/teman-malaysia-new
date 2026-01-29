export default function AboutVideo() {
  return (
    <section className="video-section">
      <div className="container">
        <div className="video-section__hero animate-on-scroll">
          <div className="video-section__content">
            <h2 className="video-section__title">Your Reliable Care Companion</h2>
            <p className="video-section__description">
              Teman Malaysia provides the best care companionship services to improve your loved one&apos;s quality of life and provide the assistance they need.
            </p>
          </div>

          <div className="video-section__wrapper">
            <div className="video-section__embed">
              <iframe
                src="https://www.youtube.com/embed/GsR87QDkITI?rel=0&modestbranding=1"
                title="Into Teman Malaysia - Your Reliable Care Companion"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};