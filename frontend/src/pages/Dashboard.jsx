import { useEffect, useState } from 'react';
import api from '../api/api';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((response) => setData(response.data));
  }, []);

  if (!data) return <p>Caricamento dashboard...</p>;

  const cards = [
    { label: 'Clienti', value: data.clientCount },
    { label: 'Progetti attivi', value: data.activeProjectCount },
    { label: 'Task aperti', value: data.openTaskCount }
  ];

  return (
    <div className="page-stack">
      <section className="grid grid-3">
        {cards.map((card) => (
          <div className="summary-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </section>

      <section className="grid grid-2">
        <div className="panel">
          <h2 className="panel-title">Task in scadenza</h2>
          {data.upcomingTasks.length === 0 ? (
            <EmptyState title="Nessuna scadenza vicina" text="I task dei prossimi 7 giorni compariranno qui." />
          ) : (
            <div>
              {data.upcomingTasks.map((task) => (
                <div className="stack-item" key={task._id}>
                  <div className="flex-between">
                    <div>
                      <strong>{task.title}</strong>
                      <div className="text-muted small">{task.project?.title}</div>
                    </div>
                    <StatusBadge value={task.priority} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="panel">
          <h2 className="panel-title">Ultimi inserimenti</h2>
          <div className="grid grid-2-sm">
            <div>
              <h3 className="column-title">Clienti</h3>
              {data.recentClients.map((client) => (
                <div className="mini-row" key={client._id}>{client.name}</div>
              ))}
            </div>
            <div>
              <h3 className="column-title">Progetti</h3>
              {data.recentProjects.map((project) => (
                <div className="mini-row" key={project._id}>{project.title}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
