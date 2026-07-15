import { useEffect, useRef, useState } from 'react';
import { IconDots } from './Icons.jsx';

const DropdownMenu = ({ items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="menu-wrap" ref={ref}>
      <button className="icon-btn" onClick={() => setOpen(!open)} aria-label="Azioni">
        <IconDots />
      </button>
      {open && (
        <div className="menu-list">
          {items.map((item) => (
            <button
              key={item.label}
              className={`menu-item${item.danger ? ' menu-item-danger' : ''}`}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
