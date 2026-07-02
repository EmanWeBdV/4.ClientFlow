const EmptyState = ({ title, text }) => (
  <div className="empty-state">
    <h2 className="h5">{title}</h2>
    <p className="text-muted mb-0">{text}</p>
  </div>
);

export default EmptyState;
