import { useState, useEffect, RefObject } from 'react';

interface Position {
  x: string;
  y: string;
}

interface ResponsivePosition {
  x: string;
  y: string;
  scale: number;
}

/**
 * A hook that calculates responsive positions based on container dimensions
 * @param containerRef - Reference to the container element
 * @param positions - Array of original positions
 * @returns Array of responsive positions
 */
export function useResponsivePositioning(
  containerRef: RefObject<HTMLDivElement | null>,
  positions: Position[]
): ResponsivePosition[] {
  const [responsivePositions, setResponsivePositions] = useState<ResponsivePosition[]>(
    positions.map(pos => ({ ...pos, scale: 1 }))
  );

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const scale = Math.min(1, width / 500, height / 500);

      setResponsivePositions(
        positions.map(pos => ({
          x: pos.x,
          y: pos.y,
          scale
        }))
      );
    };

    // Initial calculation
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, positions]);

  return responsivePositions;
}
