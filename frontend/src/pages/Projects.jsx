import { useEffect, useState } from 'react';
import api from '../api/api';
import { formatDate } from '../utils/format';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import DropdownMenu from '../components/DropdownMenu.jsx';
import { IconCalendar, IconFolder, IconPencil, IconPlus, IconSearch, IconTrash } from '../components/Icons.jsx';

const initialForm = { title: '', description: '', client: '', status: 'Da iniziare', startDate: '', dueDate: '' };
const STATUSES = ['Da iniziare', 'Attivo', 'In revisione', 'Completato'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('Tutti');
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const loadData = async () => {
    const [projectsResponse, clientsResponse] = await Promise.all([api.get('/projects'), api.get('/clients')]);
    setProjects(projectsResponse.data);
    setClients(clientsResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      description: project.description || '',
      client: project.client?._id || '',
      status: project.status,
      startDate: project.startDate?.slice(0, 10) || '',
      dueDate: project.dueDate?.slice(0, 10) || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/projects/${editingId}`, form);
    } else {
      await api.post('/projects', form);
    }
    setModalOpen(false);
    loadData();
  };

  const deleteProject = async () => {
    await api.delete(`/projects/${confirmTarget._id}`);
    setConfirmTarget(null);
    loadData();
  };

  const changeStatus = async (project, status) => {
    if (project.status === status) return;
    await api.put(`/projects/${project._id}`, { status });
    loadData();
  };

  const handleDrop = (status) => {
    const project = projects.find((p) => p._id === dragId);
    setDragOver(null);
    setDragId(null);
    if (project) changeStatus(project, status);
  };

  const filtered = projects.filter((project) => {
    const text = `${project.title} ${project.client?.name || ''}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesClient = clientFilter === 'Tutti' || project.client?._id === clientFilter;
    return matchesSearch && matchesClient;
  });

  if (loading) return <p>Caricamento progetti...</p>;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Progetti</h1>
          <p className="page-subtitle">
            I lavori in corso, organizzati per stato: trascina le card da una colonna all'altra per aggiornarle.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Aggiungi progetto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="intro-panel">
          <div className="intro-icon"><IconFolder size={30} /></div>
          <h2>Organizza il lavoro in progetti</h2>
          <p>
            Un progetto è un lavoro concreto per un cliente, con date di inizio e scadenza. Nella bacheca
            kanban vedi subito cosa è da iniziare, cosa è attivo, cosa è in revisione e cosa è completato.
          </p>
          <button className="btn btn-primary" onClick={openCreate}>
            <IconPlus size={16} /> Aggiungi il primo progetto
          </button>
        </div>
      ) : (
        <>
          <div className="toolbar">
            <div className="search-box">
              <IconSearch size={16} />
              <input
                className="field"
                placeholder="Cerca per titolo o cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="field toolbar-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}>
              <option value="Tutti">Tutti i clienti</option>
              {clients.map((client) => (
                <option value={client._id} key={client._id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div className="kanban">
            {STATUSES.map((status) => {
              const columnProjects = filtered.filter((project) => project.status === status);
              return (
                <div
                  key={status}
                  className={`kanban-col${dragOver === status ? ' drag-over' : ''}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(status);
                  }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={() => handleDrop(status)}
                >
                  <div className="kanban-col-head">
                    <span>{status}</span>
                    <span className="kanban-count">{columnProjects.length}</span>
                  </div>
                  {columnProjects.map((project) => (
                    <div
                      key={project._id}
                      className={`kanban-card${dragId === project._id ? ' dragging' : ''}`}
                      draggable
                      onDragStart={() => setDragId(project._id)}
                      onDragEnd={() => {
                        setDragId(null);
                        setDragOver(null);
                      }}
                    >
                      <div className="kanban-card-head">
                        <h3>{project.title}</h3>
                        <DropdownMenu
                          items={[
                            { label: 'Modifica', icon: <IconPencil size={15} />, onClick: () => openEdit(project) },
                            { label: 'Elimina', icon: <IconTrash size={15} />, danger: true, onClick: () => setConfirmTarget(project) }
                          ]}
                        />
                      </div>
                      <div className="text-muted small">{project.client?.name}</div>
                      {project.dueDate && (
                        <div className="kanban-due small">
                          <IconCalendar size={14} /> Scadenza: {formatDate(project.dueDate)}
                        </div>
                      )}
                      <select
                        className="field mini-select"
                        value={project.status}
                        onChange={(e) => changeStatus(project, e.target.value)}
                        aria-label="Cambia stato"
                      >
                        {STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                  {columnProjects.length === 0 && <div className="kanban-empty">Nessun progetto</div>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {modalOpen && (
        <Modal title={editingId ? 'Modifica progetto' : 'Nuovo progetto'} onClose={() => setModalOpen(false)}>
          <form className="stacked-form" onSubmit={handleSubmit}>
            <label className="form-label">Titolo</label>
            <input className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <label className="form-label">Cliente</label>
            <select className="field" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required>
              <option value="">Seleziona cliente</option>
              {clients.map((client) => (
                <option value={client._id} key={client._id}>{client.name}</option>
              ))}
            </select>
            <label className="form-label">Stato</label>
            <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <div className="form-row">
              <div>
                <label className="form-label">Data inizio</label>
                <input className="field" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Scadenza</label>
                <input className="field" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </div>
            </div>
            <label className="form-label">Descrizione</label>
            <textarea className="field" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="btn btn-primary btn-block">{editingId ? 'Salva modifiche' : 'Aggiungi progetto'}</button>
          </form>
        </Modal>
      )}

      {confirmTarget && (
        <ConfirmDialog
          title="Eliminare il progetto?"
          message={`«${confirmTarget.title}» verrà eliminato insieme a tutti i suoi task. Questa azione non si può annullare.`}
          onConfirm={deleteProject}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
};

export default Projects;
