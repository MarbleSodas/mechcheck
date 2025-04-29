import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Shuffles an array using Fisher-Yates algorithm with a dynamic seed
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid modifying the original
  const newArray = [...array];

  // Use current timestamp as part of the seed for true randomization
  const seed = Date.now();

  // Fisher-Yates shuffle
  for (let i = newArray.length - 1; i > 0; i--) {
    // Use a combination of Math.random() and the seed for better randomization
    const j = Math.floor((Math.random() * seed % 10000) / 10000 * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
