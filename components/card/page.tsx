import React from 'react';

type CardProps = {
  color?: string; // optional, defaults to a neutral shade
  children?: React.ReactNode;
  className?: string; // added className to allow custom styles
};

const Card: React.FC<CardProps> = ({ color = '#f3f4f6', children, className = '' }) => {
  return (
    <div
      className={`rounded-4xl shadow-md p-6 text-white ${className}`} // merged className
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};

export default Card;
