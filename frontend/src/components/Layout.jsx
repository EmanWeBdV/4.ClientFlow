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
        <div className="brand">ClientFlow</div>
        <nav className="nav flex-column gap-1">
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
            <h1 className="h4 mb-0">Gestione clienti e progetti</h1>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="small d-none d-sm-inline">{user?.name}</span>
            <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
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
