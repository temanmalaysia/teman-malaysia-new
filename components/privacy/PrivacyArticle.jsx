export default function PrivacyArticle({ 
  sectionNumber, 
  title, 
  children 
}) {
  return (
    <article className="privacy-article privacy-content">
      <h2>
        <span className="section-number">{sectionNumber}</span> {title}
      </h2>
      {children}
    </article>
  );
};

const PrivacySubsection = ({ 
  number, 
  children 
}) => {
  return (
    <div className="privacy-subsection">
      <h3>{number}</h3>
      {children}
    </div>
  );
};

export { PrivacyArticle, PrivacySubsection };