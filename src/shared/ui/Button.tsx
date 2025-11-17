import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'ghost';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary-hover focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed',
    secondary: 'bg-white text-primary border border-primary hover:bg-secondary focus:ring-primary',
    white: 'bg-white text-primary hover:bg-gray-50 focus:ring-primary shadow-md',
    ghost: 'bg-transparent text-white border border-white hover:bg-white/10 focus:ring-white',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
