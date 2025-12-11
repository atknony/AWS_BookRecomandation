/**
 * Validation utility functions
 */

/**
 * Validates an email address format
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns True if password meets requirements (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
 */
export function validatePassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasLowerCase && hasNumber;
}

/**
 * Validates that a field is not empty
 * @param value - Value to validate
 * @returns True if value is not empty, false otherwise
 */
export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}
