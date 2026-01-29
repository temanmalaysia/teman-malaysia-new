export default function BlogCard({ date, title, paragraphs, references }) {
  return (
    <article className="blog-card">
      <span className="blog-card__date">{date}</span>
      <h3 className="blog-card__title">{title}</h3>
      
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="blog-card__paragraph">
          {paragraph}
        </p>
      ))}

      {references && references.length > 0 && (
        <div className="blog-card__references">
          <h4 className="blog-card__references-title">
            {references.title || 'References:'}
          </h4>
          <ul className="blog-card__references-list">
            {references.items.map((ref, index) => (
              <li key={index} className="blog-card__references-item">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};