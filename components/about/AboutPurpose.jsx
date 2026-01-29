import { FiEye, FiStar, FiTarget, FiBookOpen, FiUsers, FiMonitor } from 'react-icons/fi';

export default function AboutPurpose() {
  return (
    <section className="vision-mission section">
      <div className="container">
        {/* Section Header */}
        <div className="section__header animate-on-scroll">
          <span className="section__tag">Our Purpose</span>
          <h2 className="section__title">Vision &amp; Mission</h2>
          <div className="section__divider"></div>
          <p className="section__subtitle">
            Driving meaningful change in Malaysia&apos;s care companion industry
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="vision-mission__grid">
          {/* Vision Card */}
          <div className="vision-mission__card animate-on-scroll">
            <div className="vision-mission__header">
              <div className="vision-mission__icon">
                <FiEye size={30} />
              </div>
              <h3 className="vision-mission__title">Our Vision</h3>
              <p className="vision-mission__subtitle">Leading the future of care</p>
            </div>

            <ul className="vision-mission__list">
              <li className="vision-mission__item">
                <div className="vision-mission__item-icon">
                  <FiStar size={20} />
                </div>
                <p className="vision-mission__item-text">
                  To be the leading care companion services provider in Malaysia, setting the standard for quality, compassion, and innovation in elderly care.
                </p>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="vision-mission__card animate-on-scroll">
            <div className="vision-mission__header">
              <div className="vision-mission__icon">
                <FiTarget size={30} />
              </div>
              <h3 className="vision-mission__title">Our Mission</h3>
              <p className="vision-mission__subtitle">Making a difference every day</p>
            </div>

            <ul className="vision-mission__list">
              <li className="vision-mission__item">
                <div className="vision-mission__item-icon">
                  <FiBookOpen size={20} />
                </div>
                <p className="vision-mission__item-text">
                  Raise awareness about graceful aging through educational content across our digital platforms and community outreach.
                </p>
              </li>

              <li className="vision-mission__item">
                <div className="vision-mission__item-icon">
                  <FiUsers size={20} />
                </div>
                <p className="vision-mission__item-text">
                  Create meaningful employment opportunities that contribute to reducing unemployment while building a caring community.
                </p>
              </li>

              <li className="vision-mission__item">
                <div className="vision-mission__item-icon">
                  <FiMonitor size={20} />
                </div>
                <p className="vision-mission__item-text">
                  Leverage cutting-edge technology to enhance care companionship services and improve accessibility.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
