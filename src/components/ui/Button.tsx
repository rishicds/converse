import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-open-sans font-medium transition-all duration-200';
  const variants = {
    primary: 'bg-[#5c768d] text-white hover:bg-[#4a626f] shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-[#5c768d] border-2 border-[#5c768d] hover:bg-[#5c768d] hover:text-white'
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
