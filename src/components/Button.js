import React from 'react';

const Button = ({ id, label, onClick, className }) => {
  return (
    <button
      id={id}
      onClick={() => onClick(label)}
      className={`p-8 m-1 text-xl bg-gray-200 rounded shadow ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;