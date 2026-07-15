import { useState } from 'react';
import { IconEye, IconEyeOff } from './Icons.jsx';

const PasswordInput = ({ value, onChange, placeholder, required }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="password-wrap">
      <input
        className="field"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Nascondi password' : 'Mostra password'}
      >
        {show ? <IconEyeOff size={17} /> : <IconEye size={17} />}
      </button>
    </div>
  );
};

export default PasswordInput;
