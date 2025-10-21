import React from 'react';

interface TransparentCardProps {
  children: React.ReactNode;
  className?: string;
  bg?: string; // Accepts Tailwind classes or custom bg string
}

const TransparentCard: React.FC<TransparentCardProps> = ({
  children,
  className = '',
  bg = 'bg-white/10', // Default background
}) => {
  return (
    <div className={`${bg} backdrop-blur-md border border-white/20 shadow-lg rounded-4xl text-white ${className}`}>
      {children}
    </div>
  );
};

export default TransparentCard;