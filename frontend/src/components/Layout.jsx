import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <img className="brand-logo" src="/clientflow-logo-white.svg" alt="ClientFlow" />
        <nav className="sidebar-nav">
          <NavLink className="nav-link" to="/">
            Dashboard
          </NavLink>
          <NavLink className="nav-link" to="/clients">
            Clienti
          </NavLink>
          <NavLink className="nav-link" to="/projects">
            Progetti
          </NavLink>
          <NavLink className="nav-link" to="/tasks">
            Task
          </NavLink>
        </nav>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <span className="text-muted small">Area di lavoro</span>
            <h1 className="topbar-title">Gestione clienti e progetti</h1>
          </div>
          <div className="topbar-user">
            <span className="topbar-username small">{user?.name}</span>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
