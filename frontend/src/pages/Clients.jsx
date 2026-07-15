import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import StatusBadge from '../components/StatusBadge.jsx';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import DropdownMenu from '../components/DropdownMenu.jsx';
import { IconArrowRight, IconPencil, IconPlus, IconSearch, IconTrash, IconUsers } from '../components/Icons.jsx';

const initialForm = { name: '', email: '', phone: '', notes: '', status: 'Nuovo' };
const STATUSES = ['Nuovo', 'Attivo', 'In pausa', 'Chiuso'];

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tutti');

  const loadClients = async () => {
    const { data } = await api.get('/clients');
    setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEdit = (client) => {
    setEditingId(client._id);
    setForm({
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      notes: client.notes || '',
      status: client.status
    });
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/clients/${editingId}`, form);
    } else {
      await api.post('/clients', form);
    }
    setModalOpen(false);
    loadClients();
  };

  const deleteClient = async () => {
    await api.delete(`/clients/${confirmTarget._id}`);
    setConfirmTarget(null);
    loadClients();
  };

  const filtered = clients.filter((client) => {
    const text = `${client.name} ${client.email || ''} ${client.phone || ''}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Tutti' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p>Caricamento clienti...</p>;

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <h1 className="page-title">Clienti</h1>
          <p className="page-subtitle">L'anagrafica di chi lavora con te: contatti, stato della relazione e note.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Aggiungi cliente
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="intro-panel">
          <div className="intro-icon"><IconUsers size={30} /></div>
          <h2>Parti dai tuoi clienti</h2>
          <p>
            Un cliente è la persona o l'azienda per cui lavori. Qui salvi i contatti, lo stato della
            relazione e le note utili; poi potrai collegare a ogni cliente i suoi progetti e i relativi task.
          </p>
          <button className="btn btn-primary" onClick={openCreate}>
            <IconPlus size={16} /> Aggiungi il primo cliente
          </button>
        </div>
      ) : (
        <>
          <div className="toolbar">
            <div className="search-box">
              <IconSearch size={16} />
              <input
                className="field"
                placeholder="Cerca per nome, email o telefono..."
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
          </div>

          <div className="panel">
            {filtered.length === 0 ? (
              <p className="text-muted">Nessun cliente corrisponde alla ricerca.</p>
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
                    {filtered.map((client) => (
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
                            <DropdownMenu
                              items={[
                                { label: 'Dettaglio', icon: <IconArrowRight size={15} />, onClick: () => navigate(`/clients/${client._id}`) },
                                { label: 'Modifica', icon: <IconPencil size={15} />, onClick: () => openEdit(client) },
                                { label: 'Elimina', icon: <IconTrash size={15} />, danger: true, onClick: () => setConfirmTarget(client) }
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
        <Modal title={editingId ? 'Modifica cliente' : 'Nuovo cliente'} onClose={() => setModalOpen(false)}>
          <form className="stacked-form" onSubmit={handleSubmit}>
            <label className="form-label">Nome azienda o persona</label>
            <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label className="form-label">Email</label>
            <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <label className="form-label">Telefono</label>
            <input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <label className="form-label">Stato</label>
            <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <label className="form-label">Note</label>
            <textarea className="field" rows="4" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <button className="btn btn-primary btn-block">{editingId ? 'Salva modifiche' : 'Aggiungi cliente'}</button>
          </form>
        </Modal>
      )}

      {confirmTarget && (
        <ConfirmDialog
          title="Eliminare il cliente?"
          message={`«${confirmTarget.name}» verrà eliminato insieme a tutti i suoi progetti e task. Questa azione non si può annullare.`}
          onConfirm={deleteClient}
          onCancel={() => setConfirmTarget(null)}
        />
      )}
    </div>
  );
};

export default Clients;
