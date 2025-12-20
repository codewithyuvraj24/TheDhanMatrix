/**
 * Input Validators and Formatters
 * Validates user inputs and formats data for display
 */

/**
 * Validates investment amount
 * @param amount - The investment amount to validate
 * @returns true if amount is valid
 */
export function validateInvestmentAmount(amount: string | number): boolean {
  try {
    const num = parseFloat(amount.toString().trim())
    // Check if it's a valid number, positive, and within reasonable limits
    return !isNaN(num) && num > 0 && num <= 10000000
  } catch {
    return false
  }
}

/**
 * Validates email format
 * @param email - The email address to validate
 * @returns true if email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates password strength
 * @param password - The password to validate
 * @returns true if password meets minimum requirements (6+ characters)
 */
export function validatePassword(password: string): boolean {
  return password.length >= 6
}

/**
 * Formats a number as USD currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number | string): string {
  try {
    const num = parseFloat(amount.toString())
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  } catch {
    return '$0.00'
  }
}

/**
 * Validates withdrawal date is in the future
 * @param date - The withdrawal date to validate
 * @returns true if date is in the future
 */
export function validateWithdrawalDate(date: string): boolean {
  try {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate > today
  } catch {
    return false
  }
}

/**
 * Gets error message for invalid investment amount
 * @param amount - The invalid amount
 * @returns Human-readable error message
 */
export function getAmountErrorMessage(amount: string | number): string {
  if (!amount) return 'Investment amount is required'
  const num = parseFloat(amount.toString())
  if (isNaN(num)) return 'Investment amount must be a number'
  if (num <= 0) return 'Investment amount must be greater than 0'
  if (num > 10000000) return 'Investment amount cannot exceed $10,000,000'
  return 'Invalid investment amount'
}

/**
 * Gets error message for invalid email
 * @param email - The invalid email
 * @returns Human-readable error message
 */
export function getEmailErrorMessage(email: string): string {
  if (!email) return 'Email is required'
  if (!validateEmail(email)) return 'Please enter a valid email address'
  return 'Invalid email'
}

/**
 * Gets error message for invalid password
 * @param password - The invalid password
 * @returns Human-readable error message
 */
export function getPasswordErrorMessage(password: string): string {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters long'
  return 'Invalid password'
}
