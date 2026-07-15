import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import NotificationsBell from './NotificationsBell.jsx';
import { IconActivity, IconCheckSquare, IconFolder, IconHome, IconMenu, IconUsers, IconX } from './Icons.jsx';

const navItems = [
  { to: '/', label: 'Dashboard', icon: <IconHome /> },
  { to: '/clients', label: 'Clienti', icon: <IconUsers /> },
  { to: '/projects', label: 'Progetti', icon: <IconFolder /> },
  { to: '/tasks', label: 'Task', icon: <IconCheckSquare /> },
  { to: '/activity', label: 'Attività', icon: <IconActivity /> }
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar${menuOpen ? ' open' : ''}`}>
        <div className="sidebar-head">
          <img className="brand-logo" src="/clientflow-logo-white.svg" alt="ClientFlow" />
          <button className="icon-btn sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Chiudi menu">
            <IconX />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink className="nav-link" to={item.to} key={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {menuOpen && <div className="sidebar-backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn hamburger" onClick={() => setMenuOpen(true)} aria-label="Apri menu">
              <IconMenu size={22} />
            </button>
            <div>
              <span className="text-muted small">Area di lavoro</span>
              <h1 className="topbar-title">Gestione clienti e progetti</h1>
            </div>
          </div>
          <div className="topbar-user">
            <NotificationsBell />
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
