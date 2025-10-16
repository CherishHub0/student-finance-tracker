// validators.js

// Regex patterns
const regex = {
  description: /^\S(?:.*\S)?$/,
  amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWords: /\b(\w+)\s+\1\b/i
};

// Validate a single transaction
export function validateTransaction(transaction) {
  const errors = [];

  if (!regex.description.test(transaction.description))
    errors.push("Description cannot start/end with spaces or be empty.");

  if (regex.duplicateWords.test(transaction.description))
    errors.push("Description contains duplicate words (e.g., 'food food').");

  // Amount
  if (!regex.amount.test(String(transaction.amount)))
    errors.push("Amount must be a valid number with up to 2 decimals.");

  // Category
  if (!regex.category.test(transaction.category))
    errors.push("Category must contain only letters, spaces, or hyphens.");

  // Date
  if (!regex.date.test(transaction.date))
    errors.push("Date must follow YYYY-MM-DD format.");

  return errors;
}
export function validateSettings(settings) {
  const errors = [];
  if (!settings.baseCurrency) errors.push("Base currency is required.");
  if (!settings.rates.USD || settings.rates.USD <= 0)
    errors.push("USD rate must be positive.");
  if (!settings.rates.NGN || settings.rates.NGN <= 0)
    errors.push("NGN rate must be positive.");
  return errors;
}
