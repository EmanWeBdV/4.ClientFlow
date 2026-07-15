import { useEffect, useState } from 'react';
import api from '../api/api';
import { formatDateTime } from '../utils/format';
import EmptyState from '../components/EmptyState.jsx';
import { IconArrowRight, IconPencil, IconPlus, IconTrash } from '../components/Icons.jsx';

const actionIcons = {
  creato: <IconPlus size={15} />,
  modificato: <IconPencil size={15} />,
  eliminato: <IconTrash size={15} />,
  stato: <IconArrowRight size={15} />
};

const Activity = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    api.get('/activities').then((response) => setActivities(response.data));
  }, []);

  if (!activities) return <p>Caricamento attività...</p>;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attività</h1>
          <p className="page-subtitle">Il registro di tutto quello che succede nel tuo spazio di lavoro, con data e ora.</p>
        </div>
      </div>

      <div className="panel">
        {activities.length === 0 ? (
          <EmptyState title="Nessuna attività" text="Le azioni su clienti, progetti e task compariranno qui." />
        ) : (
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-row" key={activity._id}>
                <span className={`activity-icon activity-${activity.action}`}>
                  {actionIcons[activity.action] || actionIcons.modificato}
                </span>
                <div>
                  <div>{activity.description}</div>
                  <div className="text-muted small">{formatDateTime(activity.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
