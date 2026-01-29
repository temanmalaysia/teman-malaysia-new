export default function TermsArticle({ 
  sectionNumber, 
  title, 
  children 
}) {
  return (
    <article className="terms-article terms-content">
      <h2>
        <span className="section-number">{sectionNumber}</span> {title}
      </h2>
      {children}
    </article>
  );
};

const TermsSubsection = ({ 
  number, 
  children 
}) => {
  return (
    <div className="terms-subsection">
      <h3>{number}</h3>
      {children}
    </div>
  );
};

export { TermsArticle, TermsSubsection };
