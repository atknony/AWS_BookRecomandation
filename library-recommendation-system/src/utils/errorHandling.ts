/**
 * Error handling utilities
 */

/**
 * Handles API errors and displays user-friendly messages
 *
 * TODO: Integrate with a proper toast notification library
 * Recommended: react-hot-toast or react-toastify
 *
 * Installation: npm install react-hot-toast
 * Usage: import toast from 'react-hot-toast';
 *        toast.error(message);
 */
export function handleApiError(error: unknown): void {
  let message = 'An unexpected error occurred';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  // For now, use alert (replace with toast notification)
  alert(`Error: ${message}`);
  console.error('API Error:', error);
}

/**
 * Shows a success message to the user
 *
 * TODO: Replace with toast.success(message)
 */
export function showSuccess(message: string): void {
  alert(`Success: ${message}`);
  console.log('Success:', message);
}
