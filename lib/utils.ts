import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes dynamically.
 * It uses `clsx` to construct class names conditionally and `twMerge` to resolve Tailwind utility conflicts.
 *
 * @param inputs - An array of class names or conditional class objects.
 * @returns A merged string of Tailwind classes without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
