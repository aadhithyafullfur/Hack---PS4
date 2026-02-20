import React from 'react';
import { Loader2 } from 'lucide-react';
import './../../index.css';

const Button = ({ children, loading, disabled, className = '', ...props }) => {
    return (
        <button
            className={`btn btn-primary ${className}`}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? <Loader2 className="loader" size={20} style={{ animation: 'spin 1s linear infinite' }} /> : children}
        </button>
    );
};

export default Button;
