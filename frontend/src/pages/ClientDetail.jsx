import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/api';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const ClientDetail = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadClient = async () => {
      const [clientResponse, projectsResponse] = await Promise.all([
        api.get(`/clients/${id}`),
        api.get('/projects')
      ]);
      setClient(clientResponse.data);
      setProjects(projectsResponse.data.filter((project) => project.client?._id === id));
    };

    loadClient();
  }, [id]);

  if (!client) return <p>Caricamento cliente...</p>;

  return (
    <div className="page-stack">
      <div>
        <Link className="btn btn-outline btn-sm" to="/clients">
          Torna ai clienti
        </Link>
      </div>

      <section className="panel">
        <div className="flex-between">
          <div>
            <h2>{client.name}</h2>
            <p className="text-muted">{client.email || 'Email non inserita'}</p>
          </div>
          <StatusBadge value={client.status} />
        </div>

        <div className="detail-grid">
          <div>
            <span className="detail-label">Telefono</span>
            <strong>{client.phone || 'Non inserito'}</strong>
          </div>
          <div>
            <span className="detail-label">Note</span>
            <p>{client.notes || 'Nessuna nota salvata.'}</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <h3 className="panel-title">Progetti collegati</h3>
        {projects.length === 0 ? (
          <EmptyState title="Nessun progetto" text="Quando crei un progetto per questo cliente lo vedrai in questa sezione." />
        ) : (
          <div className="grid grid-2">
            {projects.map((project) => (
              <div className="item-card" key={project._id}>
                <div className="flex-between">
                  <h4>{project.title}</h4>
                  <StatusBadge value={project.status} />
                </div>
                <p className="text-muted small">{project.description || 'Nessuna descrizione.'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ClientDetail;
