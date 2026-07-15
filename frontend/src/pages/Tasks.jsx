import { useEffect, useState } from 'react';
import api from '../api/api';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const initialForm = { title: '', description: '', project: '', priority: 'Media', status: 'Da fare', dueDate: '' };

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    const [tasksResponse, projectsResponse] = await Promise.all([api.get('/tasks'), api.get('/projects')]);
    setTasks(tasksResponse.data);
    setProjects(projectsResponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/tasks/${editingId}`, form);
    } else {
      await api.post('/tasks', form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadData();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      project: task.project?._id || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.slice(0, 10) || ''
    });
  };

  const deleteTask = async (id) => {
    if (window.confirm('Eliminare questo task?')) {
      await api.delete(`/tasks/${id}`);
      loadData();
    }
  };

  return (
    <div className="split-layout">
      <div className="panel">
        <h2 className="panel-title">{editingId ? 'Modifica task' : 'Nuovo task'}</h2>
        <form className="stacked-form" onSubmit={handleSubmit}>
          <input className="field" placeholder="Titolo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <select className="field" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} required>
            <option value="">Seleziona progetto</option>
            {projects.map((project) => <option value={project._id} key={project._id}>{project.title}</option>)}
          </select>
          <select className="field" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option>Bassa</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
          <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Da fare</option>
            <option>In corso</option>
            <option>Completata</option>
          </select>
          <input className="field" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <textarea className="field" placeholder="Descrizione" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn btn-primary btn-block">{editingId ? 'Salva modifiche' : 'Aggiungi task'}</button>
        </form>
      </div>
      <div className="panel">
        <h2 className="panel-title">Task</h2>
        {tasks.length === 0 ? (
          <EmptyState title="Nessun task" text="Aggiungi task collegati ai progetti attivi." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Titolo</th>
                  <th>Progetto</th>
                  <th>Priorita</th>
                  <th>Stato</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>
                      <strong>{task.title}</strong>
                      <div className="text-muted small">{task.description}</div>
                    </td>
                    <td>{task.project?.title}</td>
                    <td><StatusBadge value={task.priority} /></td>
                    <td><StatusBadge value={task.status} /></td>
                    <td>
                      <div className="cell-actions">
                        <button className="btn btn-sm btn-outline" onClick={() => startEdit(task)}>Modifica</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task._id)}>Elimina</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
