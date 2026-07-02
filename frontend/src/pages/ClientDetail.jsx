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
        <Link className="btn btn-outline-primary btn-sm" to="/clients">
          Torna ai clienti
        </Link>
      </div>

      <section className="panel">
        <div className="d-flex flex-wrap justify-content-between gap-3">
          <div>
            <h2 className="h4 mb-1">{client.name}</h2>
            <p className="text-muted mb-0">{client.email || 'Email non inserita'}</p>
          </div>
          <StatusBadge value={client.status} />
        </div>

        <div className="row g-3 mt-3">
          <div className="col-md-4">
            <span className="detail-label">Telefono</span>
            <strong>{client.phone || 'Non inserito'}</strong>
          </div>
          <div className="col-md-8">
            <span className="detail-label">Note</span>
            <p className="mb-0">{client.notes || 'Nessuna nota salvata.'}</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <h3 className="h5">Progetti collegati</h3>
        {projects.length === 0 ? (
          <EmptyState title="Nessun progetto" text="Quando crei un progetto per questo cliente lo vedrai in questa sezione." />
        ) : (
          <div className="row g-3">
            {projects.map((project) => (
              <div className="col-md-6" key={project._id}>
                <div className="item-card">
                  <div className="d-flex justify-content-between gap-2 mb-2">
                    <h4 className="h6 mb-0">{project.title}</h4>
                    <StatusBadge value={project.status} />
                  </div>
                  <p className="text-muted small mb-0">{project.description || 'Nessuna descrizione.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ClientDetail;
