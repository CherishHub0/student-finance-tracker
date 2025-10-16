// ui.js
import { transactions, settings, addTransaction, deleteTransaction, generateTransactionId } from "./state.js";

console.log("ui.js loaded");

const tableBody = document.getElementById("records-table-body");
const totalTransactionsEl = document.getElementById("total-transactions");
const totalAmountEl = document.getElementById("total-amount");
const topCategoryEl = document.getElementById("top-category");
const averageTransactionEl = document.getElementById("average-transaction");
const recordForm = document.getElementById("record-form");
const spendingPieCanvas = document.getElementById("spending-pie");

import { getCapStatus } from './state.js';

// aria cap alert
function updateCapAlert() {
  const capDiv = document.getElementById('cap-alert');
  if (!capDiv) return;

  const status = getCapStatus();
  if (status.exceeded) {
    capDiv.setAttribute('aria-live', 'assertive'); // urgent
    capDiv.textContent = `⚠️ You have exceeded your spending cap by RWF ${status.overage.toLocaleString()}!`;
  } else {
    capDiv.setAttribute('aria-live', 'polite'); // calm
    capDiv.textContent = `✅ You have RWF ${status.remaining.toLocaleString()} remaining before reaching your cap.`;
  }
}

let pieChart = null;

//table & stats
export function renderTable() {
  tableBody.innerHTML = "";

  if (transactions.length === 0) {
    renderStats();
    renderPieChart();
    return;
  }

  transactions.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tx.id}</td>
      <td>${tx.description}</td>
      <td>${settings.baseCurrency} ${tx.amount.toLocaleString()}</td>
      <td>${tx.category}</td>
      <td>${tx.date}</td>
      <td><button data-id="${tx.id}" class="delete-btn">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  // Attach delete event listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      deleteTransaction(id);
      renderTable();
      renderStats();
      renderPieChart();
    });
  });

  renderStats();
  renderPieChart();
  updateCapAlert(); // Update cap alert whenever table changes
}

export function renderStats() {
  totalTransactionsEl.textContent = transactions.length;

  const totalAmount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  totalAmountEl.textContent = `${settings.baseCurrency} ${totalAmount.toLocaleString()}`;

  const categoryTotals = {};
  transactions.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  topCategoryEl.textContent = topCategory ? topCategory[0] : "None";

  const avg = transactions.length ? totalAmount / transactions.length : 0;
  averageTransactionEl.textContent = `${settings.baseCurrency} ${avg.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

// pie chart
export function renderPieChart() {
  const categoryTotals = {};
  transactions.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (pieChart) pieChart.destroy(); // destroy previous chart

  pieChart = new Chart(spendingPieCanvas, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#0077cc",
          "#00aaff",
          "#ff9900",
          "#ff4444",
          "#33cc33",
          "#9966ff"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: false }
      }
    }
  });
}

// form submission
if (recordForm) {
  recordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTx = {
      id: generateTransactionId(),
      description: recordForm.description.value.trim(),
      amount: Number(recordForm.amount.value),
      category: recordForm.category.value,
      date: recordForm.date.value
    };

    if (!newTx.description || !newTx.amount || !newTx.category || !newTx.date) return;

    addTransaction(newTx);
    renderTable();

    // Reset form
    recordForm.reset();
  });
}

// Initial render
renderTable();
// --- Regex Search & Highlight ---
const searchBox = document.getElementById('search-box');
const container = document.getElementById('transactions-container');

searchBox.addEventListener('input', () => {
  const pattern = searchBox.value.trim();
  let regex;

  try {
    regex = new RegExp(pattern, 'i');
  } catch (e) {
    container.innerHTML = '<p style="color:red;">Invalid regex pattern</p>';
    return;
  }

  container.innerHTML = transactions
    .filter(tx => regex.test(tx.description) || regex.test(tx.category))
    .map(tx => {
      // Highlight matches in description and category
      const desc = tx.description.replace(regex, match => `<mark>${match}</mark>`);
      const cat = tx.category.replace(regex, match => `<mark>${match}</mark>`);
      return `<div class="tx-card">
                <p><strong>${desc}</strong></p>
                <p>${cat} | ${tx.amount} ${settings.baseCurrency}</p>
              </div>`;
    })
    .join('');
});
// --- Import / Export Transactions ---
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const importFile = document.getElementById("import-file");
const notification = document.getElementById("notification");

// Export transactions to JSON file
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(transactions, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.json";
  a.click();
  URL.revokeObjectURL(url);
  notification.textContent = "✅ Transactions exported successfully!";
});

// Trigger hidden file input
importBtn.addEventListener("click", () => importFile.click());

// Handle JSON file import
importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);

      // Validate each transaction
      if (!Array.isArray(imported)) throw new Error("Invalid file format.");
      imported.forEach(tx => {
        if (!tx.id || !tx.description || !tx.amount || !tx.category || !tx.date) {
          throw new Error("Missing transaction fields.");
        }
      });

      // Replace current transactions
      transactions.length = 0;
      imported.forEach(tx => transactions.push(tx));

      saveTransactions(transactions); // Persist to localStorage
      renderTable();
      renderStats();
      renderPieChart();
      notification.textContent = "✅ Transactions imported successfully!";
    } catch (err) {
      alert("Error importing file: " + err.message);
    }
  };
  reader.readAsText(file);
});
