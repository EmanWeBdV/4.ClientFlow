import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate } from '../utils/format';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { IconArrowRight, IconCheckSquare, IconClock, IconFolder, IconUsers } from '../components/Icons.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((response) => setData(response.data));
  }, []);

  if (!data) return <p>Caricamento dashboard...</p>;

  const cards = [
    { label: 'Clienti', value: data.clientCount, icon: <IconUsers size={22} />, tone: 'blue', to: '/clients' },
    { label: 'Progetti attivi', value: data.activeProjectCount, icon: <IconFolder size={22} />, tone: 'teal', to: '/projects' },
    { label: 'Task aperti', value: data.openTaskCount, icon: <IconCheckSquare size={22} />, tone: 'green', to: '/tasks' }
  ];

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Ciao, {user?.name?.split(' ')[0]}</h1>
          <p className="page-subtitle">Ecco la situazione del tuo lavoro oggi.</p>
        </div>
      </div>

      <section className="grid grid-3">
        {cards.map((card) => (
          <Link className={`summary-card summary-${card.tone}`} to={card.to} key={card.label}>
            <div className="summary-icon">{card.icon}</div>
            <div>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-2">
        <div className="panel">
          <h2 className="panel-title">
            <IconClock size={18} /> Task in scadenza
          </h2>
          {data.upcomingTasks.length === 0 ? (
            <EmptyState title="Nessuna scadenza vicina" text="I task dei prossimi 7 giorni compariranno qui." />
          ) : (
            <div>
              {data.upcomingTasks.map((task) => (
                <div className="stack-item" key={task._id}>
                  <div className="flex-between">
                    <div>
                      <strong>{task.title}</strong>
                      <div className="text-muted small">
                        {task.project?.title} · scade il {formatDate(task.dueDate)}
                      </div>
                    </div>
                    <StatusBadge value={task.priority} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link className="panel-footer-link" to="/tasks">
            Tutti i task <IconArrowRight size={15} />
          </Link>
        </div>

        <div className="panel">
          <h2 className="panel-title">
            <IconFolder size={18} /> Ultimi inserimenti
          </h2>
          <div className="grid grid-2-sm">
            <div>
              <h3 className="column-title">Clienti</h3>
              {data.recentClients.length === 0 ? (
                <p className="text-muted small">Ancora nessun cliente.</p>
              ) : (
                data.recentClients.map((client) => (
                  <div className="mini-row" key={client._id}>
                    <span className="mini-row-icon"><IconUsers size={14} /></span>
                    {client.name}
                  </div>
                ))
              )}
            </div>
            <div>
              <h3 className="column-title">Progetti</h3>
              {data.recentProjects.length === 0 ? (
                <p className="text-muted small">Ancora nessun progetto.</p>
              ) : (
                data.recentProjects.map((project) => (
                  <div className="mini-row" key={project._id}>
                    <span className="mini-row-icon"><IconFolder size={14} /></span>
                    {project.title}
                  </div>
                ))
              )}
            </div>
          </div>
          <Link className="panel-footer-link" to="/activity">
            Vedi tutte le attività <IconArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
