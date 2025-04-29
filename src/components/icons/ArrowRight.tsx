import React from 'react';

interface ArrowRightProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({
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
        d="M35 15L50 30L35 45"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
