// search.js
import { getTransactions } from './state.js';
import { renderTransactions } from './ui.js';

const searchBox = document.getElementById('search-box');

searchBox.addEventListener('input', () => {
  const query = searchBox.value.trim();
  const allTransactions = getTransactions();

  if (!query) {
    // if search box is empty, show all
    renderTransactions(allTransactions);
    return;
  }

  let regex;
  try {
    regex = new RegExp(query, 'i'); // case-insensitive
  } catch (e) {
    console.warn('Invalid regex:', query);
    renderTransactions([]); // show nothing if regex invalid
    return;
  }

  const filtered = allTransactions.filter(tx => 
    regex.test(tx.description) || regex.test(tx.category)
  );

  renderTransactions(filtered, regex); // pass regex for highlighting
});
