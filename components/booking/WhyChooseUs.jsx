import { FaUserCheck, FaClock, FaHeart, FaShieldAlt } from 'react-icons/fa';

const benefitsData = [
  {
    id: 'trained',
    icon: <FaUserCheck size={20} />,
    title: 'Trained Professionals',
    description: 'All our Temanions are carefully screened, trained, and experienced in providing quality care.'
  },
  {
    id: 'flexible',
    icon: <FaClock size={20} />,
    title: 'Flexible Scheduling',
    description: 'Book services around your schedule - no fixed contracts required.'
  },
  {
    id: 'compassionate',
    icon: <FaHeart size={20} />,
    title: 'Compassionate Care',
    description: 'We provide not just assistance, but genuine companionship and emotional support.'
  },
  {
    id: 'safe',
    icon: <FaShieldAlt size={20} />,
    title: 'Safe & Reliable',
    description: 'Rest assured with regular updates and a supportive team.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="why-choose">
      <div className="container">
        <div className="why-choose__card">
          <h3 className="why-choose__title">Why Choose Teman Malaysia?</h3>

          <div className="why-choose__grid">
            {benefitsData.map((benefit) => (
              <div key={benefit.id} className="why-choose__item">
                <div className="why-choose__icon">
                  {benefit.icon}
                </div>
                <h4 className="why-choose__item-title">{benefit.title}</h4>
                <p className="why-choose__item-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
