import React from 'react';
import './../../index.css';

const Input = ({ label, type, name, value, onChange, placeholder, error, required, ...props }) => {
    return (
        <div className="input-group">
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className={`input-field ${error ? 'input-error' : ''}`}
                placeholder=" "
                required={required}
                {...props}
            />
            <label htmlFor={name} className="input-label">
                {label}
            </label>
            {error && <span className="error-msg" style={{ display: 'block', color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</span>}
        </div>
    );
};

export default Input;
