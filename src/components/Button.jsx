import React from 'react';

const Button = ({ onClick, children, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
