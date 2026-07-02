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
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="panel">
          <h2 className="h5">{editingId ? 'Modifica cliente' : 'Nuovo cliente'}</h2>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Nome azienda o persona" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="form-control mb-2" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="form-control mb-2" placeholder="Telefono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className="form-select mb-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Nuovo</option>
              <option>Attivo</option>
              <option>In pausa</option>
              <option>Chiuso</option>
            </select>
            <textarea className="form-control mb-3" placeholder="Note" rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <button className="btn btn-primary w-100">{editingId ? 'Salva modifiche' : 'Aggiungi cliente'}</button>
          </form>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="panel">
          <h2 className="h5">Clienti</h2>
          {clients.length === 0 ? (
            <EmptyState title="Nessun cliente" text="Aggiungi il primo cliente dal form a sinistra." />
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
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
                      <td className="text-end">
                        <Link className="btn btn-sm btn-outline-secondary me-2" to={`/clients/${client._id}`}>Dettaglio</Link>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(client)}>Modifica</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteClient(client._id)}>Elimina</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
