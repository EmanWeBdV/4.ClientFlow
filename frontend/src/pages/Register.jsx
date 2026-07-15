import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import PasswordInput from '../components/PasswordInput.jsx';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Le password non coincidono');
      return;
    }

    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registrazione non riuscita');
    }
  };

  if (done) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <img className="auth-logo" src="/clientflow-logo-horizontal.svg" alt="ClientFlow" />
          <h1>Account creato!</h1>
          <div className="alert-info">
            Al momento non è prevista una email di conferma: puoi accedere subito usando le credenziali
            che hai appena creato.
          </div>
          <Link className="btn btn-primary btn-block" to="/login">
            Vai al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img className="auth-logo" src="/clientflow-logo-horizontal.svg" alt="ClientFlow" />
        <h1>Crea account</h1>
        <p className="text-muted">Inizia a organizzare clienti, progetti e task.</p>
        {error && <div className="alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              className="field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="field"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <PasswordInput
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Conferma password</label>
            <PasswordInput
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
          </div>
          <button className="btn btn-primary btn-block">Registrati</button>
        </form>
        <p className="auth-footer">
          Hai gia un account? <Link to="/login">Accedi</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
