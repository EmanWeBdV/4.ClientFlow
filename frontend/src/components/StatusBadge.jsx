const colors = {
  Nuovo: 'bg-info',
  Attivo: 'bg-success',
  'In pausa': 'bg-warning text-dark',
  Chiuso: 'bg-secondary',
  'Da iniziare': 'bg-secondary',
  'In revisione': 'bg-primary',
  Completato: 'bg-success',
  'Da fare': 'bg-secondary',
  'In corso': 'bg-primary',
  Completata: 'bg-success',
  Bassa: 'bg-secondary',
  Media: 'bg-info',
  Alta: 'bg-danger'
};

const StatusBadge = ({ value }) => (
  <span className={`badge ${colors[value] || 'bg-secondary'}`}>{value}</span>
);

export default StatusBadge;
