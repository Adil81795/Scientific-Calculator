import React from 'react';
const Button = ({ className, value, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
