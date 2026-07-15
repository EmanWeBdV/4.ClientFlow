import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';

const initialForm = { name: '', email: '', phone: '', notes: '', status: 'Nuovo' };

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const loadClients = async () => {
    const { data } = await api.get('/clients');
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/clients/${editingId}`, form);
    } else {
      await api.post('/clients', form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadClients();
  };

  const startEdit = (client) => {
    setEditingId(client._id);
    setForm({
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      notes: client.notes || '',
      status: client.status
    });
  };

  const deleteClient = async (id) => {
    if (window.confirm('Eliminare questo cliente e i suoi progetti?')) {
      await api.delete(`/clients/${id}`);
      loadClients();
    }
  };

  return (
    <div className="split-layout">
      <div className="panel">
        <h2 className="panel-title">{editingId ? 'Modifica cliente' : 'Nuovo cliente'}</h2>
        <form className="stacked-form" onSubmit={handleSubmit}>
          <input className="field" placeholder="Nome azienda o persona" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="field" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="field" placeholder="Telefono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Nuovo</option>
            <option>Attivo</option>
            <option>In pausa</option>
            <option>Chiuso</option>
          </select>
          <textarea className="field" placeholder="Note" rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button className="btn btn-primary btn-block">{editingId ? 'Salva modifiche' : 'Aggiungi cliente'}</button>
        </form>
      </div>
      <div className="panel">
        <h2 className="panel-title">Clienti</h2>
        {clients.length === 0 ? (
          <EmptyState title="Nessun cliente" text="Aggiungi il primo cliente dal form a sinistra." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Stato</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>
                      <strong>{client.name}</strong>
                      <div className="text-muted small">{client.notes}</div>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td><StatusBadge value={client.status} /></td>
                    <td>
                      <div className="cell-actions">
                        <Link className="btn btn-sm btn-outline" to={`/clients/${client._id}`}>Dettaglio</Link>
                        <button className="btn btn-sm btn-outline" onClick={() => startEdit(client)}>Modifica</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteClient(client._id)}>Elimina</button>
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

export default Clients;
