import React from 'react';

interface ArrowLeftProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({
  width = 60,
  height = 60,
  color = '#FFFFFF',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 30H50"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 15L10 30L25 45"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
