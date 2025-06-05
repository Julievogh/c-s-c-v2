// components/Button/index.jsx
import React from 'react';

const baseStyles = 'inline-block px-6 py-2 rounded-full font-medium transition-all cursor-pointer';

const variantStyles = {
  primary: 'bg-[color:var(--color-light-green)] text-[color:var(--color-soft-beige)] hover:bg-[color:var(--color-dark-green)]',
  secondary: 'bg-[color:var(--color-golden)] text-[color:var(--color-soft-beige)] hover:bg-[color:var(--color-terracotta)]',
  outlinePrimary: 'border bg-transparent text-[color:var(--color-light-green)] hover:border-[color:var(--color-dark-green)] hover:text-[color:var(--color-dark-green)]',
  outlineSecondary: 'border bg-transparent text-[color:var(--color-golden)] hover:border-[color:var(--color-terracotta)] hover:text-[color:var(--color-terracotta)]',
};

const Button = ({ variant = 'primary', children, onClick, className = '' }) => {
  const variantClass = variantStyles[variant] || variantStyles.primary;
  return (
    <button
      className={`${baseStyles} ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
