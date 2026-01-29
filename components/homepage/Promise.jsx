import { FaHeart, FaHandsHelping, FaLeaf } from 'react-icons/fa';

const values = [
  {
    id: 'companionship',
    icon: <FaHeart size={48} color="#ffffff" />,
    title: 'Companionship',
  },
  {
    id: 'assistance',
    icon: <FaHandsHelping size={48} color="#ffffff" />,
    title: 'Assistance',
  },
  {
    id: 'wellness',
    icon: <FaLeaf size={48} color="#ffffff" />,
    title: 'Wellness',
  },
];

export default function Promise() {
  return (
    <section className="promise section">
      <div className="container">
        {/* Header */}
        <div className="promise__content">
          <h2 className="promise__title">Our Promise</h2>
          <div className="promise__divider"></div>
          <p className="promise__text">
            We are committed to providing the best care possible for your loved ones.
          </p>
        </div>

        {/* Values */}
        <div className="promise__values">
          {values.map((value) => (
            <div key={value.id} className="value-card">
              <div className="value-card__icon">
                {value.icon}
              </div>
              <h3 className="value-card__title">{value.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}