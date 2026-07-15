import { useEffect, useState } from 'react';
import api from '../api/api';
import { formatDate } from '../utils/format';
import StatusBadge from '../components/StatusBadge.jsx';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import DropdownMenu from '../components/DropdownMenu.jsx';
import { IconCheckSquare, IconPencil, IconPlus, IconSearch, IconTrash } from '../components/Icons.jsx';

const initialForm = { title: '', description: '', project: '', priority: 'Media', status: 'Da fare', dueDate: '' };
const STATUSES = ['Da fare', 'In corso', 'Completata'];
const PRIORITIES = ['Bassa', 'Media', 'Alta'];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tutti');
  const [priorityFilter, setPriorityFilter] = useState('Tutte');

  const loadData = async () => {
    const [tasksResponse, projectsResponse] = await Promise.all([api.get('/tasks'), api.get('/projects')]);
    setTasks(tasksResponse.data);
    setProjects(projectsResponse.data);
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

  const openEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      project: task.project?._id || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.slice(0, 10) || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/tasks/${editingId}`, form);
    } else {
      await api.post('/tasks', form);
    }
    setModalOpen(false);
    loadData();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${confirmTarget._id}`);
    setConfirmTarget(null);
    loadData();
  };

  const changeStatus = async (task, status) => {
    if (task.status === status) return;
    await api.put(`/tasks/${task._id}`, { status });
    loadData();
  };

  const filtered = tasks.filter((task) => {
    const text = `${task.title} ${task.project?.title || ''}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Tutti' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'Tutte' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) return <p>Caricamento task...</p>;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task</h1>
          <p className="page-subtitle">Le singole attività da svolgere, collegate ai progetti, con priorità e scadenza.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Aggiungi task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="intro-panel">
          <div className="intro-icon"><IconCheckSquare size={30} /></div>
          <h2>Spezza i progetti in task</h2>
          <p>
            Un task è una singola attività di un progetto: ha una priorità, uno stato e una scadenza.
            Dalla tabella puoi aggiornare lo stato al volo con il selettore, senza aprire nulla.
          </p>
          <button className="btn btn-primary" onClick={openCreate}>
            <IconPlus size={16} /> Aggiungi il primo task
          </button>
        </div>
      ) : (
        <>
          <div className="toolbar">
            <div className="search-box">
              <IconSearch size={16} />
              <input
                className="field"
                placeholder="Cerca per titolo o progetto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className="field toolbar-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="Tutti">Tutti gli stati</option>
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <select className="field toolbar-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="Tutte">Tutte le priorità</option>
              {PRIORITIES.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div className="panel">
            {filtered.length === 0 ? (
              <p className="text-muted">Nessun task corrisponde alla ricerca.</p>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Titolo</th>
                      <th>Progetto</th>
                      <th>Priorità</th>
                      <th>Scadenza</th>
                      <th>Stato</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((task) => (
                      <tr key={task._id}>
                        <td>
                          <strong>{task.title}</strong>
                          <div className="text-muted small">{task.description}</div>
                        </td>
                        <td>{task.project?.title}</td>
                        <td><StatusBadge value={task.priority} /></td>
                        <td>{formatDate(task.dueDate)}</td>
                        <td>
                          <select
                            className="field mini-select"
                            value={task.status}
                            onChange={(e) => changeStatus(task, e.target.value)}
                            aria-label="Cambia stato"
                          >
                            {STATUSES.map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <div className="cell-actions">
                            <DropdownMenu
                              items={[
                                { label: 'Modifica', icon: <IconPencil size={15} />, onClick: () => openEdit(task) },
                                { label: 'Elimina', icon: <IconTrash size={15} />, danger: true, onClick: () => setConfirmTarget(task) }
                              ]}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {modalOpen && (
        <Modal title={editingId ? 'Modifica task' : 'Nuovo task'} onClose={() => setModalOpen(false)}>
          <form className="stacked-form" onSubmit={handleSubmit}>
            <label className="form-label">Titolo</label>
            <input className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <label className="form-label">Progetto</label>
            <select className="field" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required>
              <option value="">Seleziona progetto</option>
              {projects.map((project) => (
                <option value={project._id} key={project._id}>{project.title}</option>
              ))}
            </select>
            <div className="form-row">
              <div>
                <label className="form-label">Priorità</label>
                <select className="field" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  {PRIORITIES.map((priority) => (
                    <option key={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Stato</label>
                <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {STATUSES.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="form-label">Scadenza</label>
            <input className="field" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            <label className="form-label">Descrizione</label>
            <textarea className="field" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="btn btn-primary btn-block">{editingId ? 'Salva modifiche' : 'Aggiungi task'}</button>
          </form>
        </Modal>
      )}

      {confirmTarget && (
        <ConfirmDialog
          title="Eliminare il task?"
          message={`«${confirmTarget.title}» verrà eliminato. Questa azione non si può annullare.`}
          onConfirm={deleteTask}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
};

export default Tasks;
