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
      <section className="row g-3">
        {cards.map((card) => (
          <div className="col-md-4" key={card.label}>
            <div className="summary-card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section className="row g-4">
        <div className="col-lg-6">
          <div className="panel">
            <h2 className="h5">Task in scadenza</h2>
            {data.upcomingTasks.length === 0 ? (
              <EmptyState title="Nessuna scadenza vicina" text="I task dei prossimi 7 giorni compariranno qui." />
            ) : (
              <div className="list-group list-group-flush">
                {data.upcomingTasks.map((task) => (
                  <div className="list-group-item px-0" key={task._id}>
                    <div className="d-flex justify-content-between gap-3">
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
        </div>

        <div className="col-lg-6">
          <div className="panel">
            <h2 className="h5">Ultimi inserimenti</h2>
            <div className="row g-3">
              <div className="col-sm-6">
                <h3 className="h6 text-muted">Clienti</h3>
                {data.recentClients.map((client) => (
                  <div className="mini-row" key={client._id}>{client.name}</div>
                ))}
              </div>
              <div className="col-sm-6">
                <h3 className="h6 text-muted">Progetti</h3>
                {data.recentProjects.map((project) => (
                  <div className="mini-row" key={project._id}>{project.title}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
