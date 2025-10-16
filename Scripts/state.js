// state.js
import { loadTransactions, saveTransactions, loadSettings, saveSettings } from './storage.js';
import { validateTransaction, validateSettings } from './validators.js';

export let transactions = loadTransactions();
export let settings = loadSettings();

export function addTransaction(transaction) {
  transactions.push(transaction);
  saveTransactions(transactions);
}

export function updateTransaction(id, updated) {
  const idx = transactions.findIndex(t => t.id === id);
  if (idx > -1) {
    transactions[idx] = { ...transactions[idx], ...updated };
    saveTransactions(transactions);
  }
}

export function deleteTransaction(id) {
  // Mutate the array instead of reassigning
  const index = transactions.findIndex(t => t.id === id);
  if (index > -1) transactions.splice(index, 1);
  saveTransactions(transactions);
}


export function updateSettings(newSettings) {
  settings = newSettings;
  saveSettings(settings);
}

export function generateTransactionId() {
  return `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}
// cap helpers
export function getTotalSpent() {
  return transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
}

export function getCapStatus() {
  const total = getTotalSpent();
  if (total <= settings.cap) {
    return { remaining: settings.cap - total, exceeded: false };
  } else {
    return { overage: total - settings.cap, exceeded: true };
  }
}

// If cap doesn't exist in saved settings, initialize default
if (settings.cap === undefined) settings.cap = 50000; // default cap
