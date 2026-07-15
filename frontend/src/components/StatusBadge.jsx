const colors = {
  Nuovo: 'badge-info',
  Attivo: 'badge-success',
  'In pausa': 'badge-warning',
  Chiuso: 'badge-neutral',
  'Da iniziare': 'badge-neutral',
  'In revisione': 'badge-accent',
  Completato: 'badge-success',
  'Da fare': 'badge-neutral',
  'In corso': 'badge-accent',
  Completata: 'badge-success',
  Bassa: 'badge-neutral',
  Media: 'badge-info',
  Alta: 'badge-danger'
};

const StatusBadge = ({ value }) => (
  <span className={`badge ${colors[value] || 'badge-neutral'}`}>{value}</span>
);

export default StatusBadge;
