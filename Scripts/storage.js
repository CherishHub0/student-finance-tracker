// storage.js
export const TRANSACTIONS_KEY = 'financeTracker:transactions:v1';
export const SETTINGS_KEY = 'financeTracker:settings:v1';

export function loadTransactions() {
  const raw = localStorage.getItem(TRANSACTIONS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse transactions', e);
    return [];
  }
}

export function saveTransactions(transactions) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_KEY);
  const defaultSettings = {
    baseCurrency: 'RWF',
    rates: { USD: 1200, NGN: 3 }
  };
  if (!raw) return structuredClone(defaultSettings);
  try {
    const parsed = JSON.parse(raw);
    parsed.baseCurrency = parsed.baseCurrency || defaultSettings.baseCurrency;
    parsed.rates = parsed.rates || defaultSettings.rates;
    parsed.rates.USD = parsed.rates.USD ?? defaultSettings.rates.USD;
    parsed.rates.NGN = parsed.rates.NGN ?? defaultSettings.rates.NGN;
    return parsed;
  } catch (e) {
    console.error('Failed to parse settings', e);
    return structuredClone(defaultSettings);
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
