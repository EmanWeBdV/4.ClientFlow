import { useEffect, useState } from 'react';
import api from '../api/api';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const initialForm = { title: '', description: '', client: '', status: 'Da iniziare', startDate: '', dueDate: '' };

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    const [projectsResponse, clientsResponse] = await Promise.all([api.get('/projects'), api.get('/clients')]);
    setProjects(projectsResponse.data);
    setClients(clientsResponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/projects/${editingId}`, form);
    } else {
      await api.post('/projects', form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadData();
  };

  const startEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description || '',
      client: project.client?._id || '',
      status: project.status,
      startDate: project.startDate?.slice(0, 10) || '',
      dueDate: project.dueDate?.slice(0, 10) || ''
    });
  };

  const deleteProject = async (id) => {
    if (window.confirm('Eliminare questo progetto e i suoi task?')) {
      await api.delete(`/projects/${id}`);
      loadData();
    }
  };

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="panel">
          <h2 className="h5">{editingId ? 'Modifica progetto' : 'Nuovo progetto'}</h2>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Titolo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <select className="form-select mb-2" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required>
              <option value="">Seleziona cliente</option>
              {clients.map((client) => <option value={client._id} key={client._id}>{client.name}</option>)}
            </select>
            <select className="form-select mb-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Da iniziare</option>
              <option>Attivo</option>
              <option>In revisione</option>
              <option>Completato</option>
            </select>
            <input className="form-control mb-2" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <input className="form-control mb-2" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <textarea className="form-control mb-3" placeholder="Descrizione" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="btn btn-primary w-100">{editingId ? 'Salva modifiche' : 'Aggiungi progetto'}</button>
          </form>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="panel">
          <h2 className="h5">Progetti</h2>
          {projects.length === 0 ? (
            <EmptyState title="Nessun progetto" text="Crea un progetto collegandolo a un cliente." />
          ) : (
            <div className="row g-3">
              {projects.map((project) => (
                <div className="col-md-6" key={project._id}>
                  <div className="item-card">
                    <div className="d-flex justify-content-between gap-2 mb-2">
                      <h3 className="h6 mb-0">{project.title}</h3>
                      <StatusBadge value={project.status} />
                    </div>
                    <p className="text-muted small mb-2">{project.description}</p>
                    <div className="small mb-3">Cliente: <strong>{project.client?.name}</strong></div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(project)}>Modifica</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProject(project._id)}>Elimina</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
