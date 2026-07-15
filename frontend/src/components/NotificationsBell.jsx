import { useEffect, useRef, useState } from 'react';
import api from '../api/api';
import { formatDate } from '../utils/format';
import { IconAlert, IconBell, IconClock } from './Icons.jsx';

const NotificationsBell = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    api.get('/notifications').then((response) => setItems(response.data.items)).catch(() => {});
  }, []);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="bell-wrap" ref={ref}>
      <button className="icon-btn" onClick={() => setOpen(!open)} aria-label="Notifiche scadenze">
        <IconBell size={20} />
        {items.length > 0 && <span className="bell-badge">{items.length}</span>}
      </button>
      {open && (
        <div className="bell-panel">
          <div className="bell-title">Scadenze</div>
          {items.length === 0 ? (
            <p className="text-muted small bell-empty">Nessuna scadenza nei prossimi 7 giorni.</p>
          ) : (
            items.map((item) => (
              <div className="bell-item" key={`${item.type}-${item.id}`}>
                <span className={item.overdue ? 'bell-icon-overdue' : 'bell-icon-soon'}>
                  {item.overdue ? <IconAlert size={16} /> : <IconClock size={16} />}
                </span>
                <div>
                  <div className="small">
                    <strong>{item.type === 'progetto' ? 'Progetto' : 'Task'}</strong> «{item.title}»
                    {item.context ? ` — ${item.context}` : ''}
                  </div>
                  <div className={`small ${item.overdue ? 'bell-overdue-text' : 'text-muted'}`}>
                    {item.overdue ? `In ritardo: scadeva il ${formatDate(item.dueDate)}` : `Scade il ${formatDate(item.dueDate)}`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsBell;
