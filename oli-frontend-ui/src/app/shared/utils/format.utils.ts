/**
 * Format Utilities
 * Shared formatting functions
 */

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string | number, format: 'short' | 'long' = 'short'): string {
  const d = new Date(date);
  
  if (format === 'short') {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
  
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalize first letter of string
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert string to title case
 */
export function titleCase(text: string): string {
  if (!text) return '';
  return text
    .split(' ')
    .map(word => capitalize(word.toLowerCase()))
    .join(' ');
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  if (!name) return '';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
