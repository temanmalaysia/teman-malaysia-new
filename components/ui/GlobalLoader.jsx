export default function GlobalLoader({ isLoading = false }) {
  if (!isLoading) return null;
  return (
    <div className="global-loader" aria-live="polite" aria-busy="true" data-testid="global-loader">
      <div className="global-loader__backdrop" />
      <div className="global-loader__content">
        <div className="global-loader__spinner" />
        <div className="global-loader__text">Loading...</div>
      </div>
    </div>
  );
}

