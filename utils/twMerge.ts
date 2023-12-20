import { twMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

// Helper function to merge tailwind classes with clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
