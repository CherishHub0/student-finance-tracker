
FinanceTracker

FinanceTracker is a simple web app that helps students (and anyone, really) track their spending, manage budgets, and understand where their money goes.

Built with HTML, CSS, and JavaScript, it includes helpful features like live spending stats, regex search, import/export options, and accessibility support.


Table of Contents
1. About the Project  
2. Main Features  
3. How to Set It Up 
4. How to Use It  
5. Regex catalog
6. Accessibility(ally notes)
7. WireFrame  
8. Demo Video

# About the Project
Managing money as a student can be tough, this app was built to make that easier.  
FinanceTracker helps you record your expenses and income, view visual stats, and get alerts when you’re close to overspending.

You can search through your transactions, export or import your data, and visualize your spending habits with charts.

## Features
- Add, edit, and delete transactions
- Persistent storage via localStorage
- Import/export transactions as JSON
- Regex-powered live search with highlighted results
- Dashboard stats: total transactions, total spent, top category,    average transaction
- Pie chart visualization of spending by category
- Spending cap alerts with ARIA live messages
- Responsive design (mobile-friendly)
- Keyboard-friendly navigation and skip-to-content link

# How to Set It Up
1. Clone the repository
   ```bash
   git clone https://github.com/Cherishhub0/FinanceTracker.git
2. Open the project folder in your code editor.
3. Launch the app by opening index.html in your browser.
(Tip: using Live Server in VS Code makes it smoother)

# How to use it.
1. Add a new record by filling out:
    - Description
    - Amount
    - Category
    - Date
    - and click Add Record.

2. Check the dashboard for:
    - Your total transactions
    - Top category
    - Average spending
    - A live pie chart of your spending

3. You’ll get alerts when you exceed your spending cap (RWF 50,000).
4. Use the search bar to find specific transactions — regex supported!
5. Export your transactions to JSON or import existing ones anytime.

## Regex Catalog

Description: Makes sure the text doesn’t start or end with spaces.
Example: "Lunch", "Coffee shop" |Not: "Lunch", "Coffee "

Amount: Allows numbers, with up to two decimal places. No negative numbers.
Example: 10, 12.50, 1000 | Not: -5, 1.234

Date: Checks for the format YYYY-MM-DD.
Example: 2024-06-15 | Not: 15-06-2024

Category: Only letters and spaces are allowed.
Example : "Food", "Online Shopping" | Not: "Food123"

Duplicate consecutive words: Finds repeated words in a row.
Example matches: "coffee coffee", "the the"

# Accessibility (a11y) Notes
- Semantic HTML: <header>, <nav>, <main>, <section>, <footer>  
- Skip-to-content link for screen reader & keyboard users  
- ARIA live regions for cap alerts:  
  - Polite when under cap  
  - Assertive when exceeded  
- Visible focus states for all interactive elements  
- Color contrast checked for buttons, text, and backgrounds

# How to Run Tests
- Open index.html in a browser.
- Test form validations: missing fields, invalid numbers, invalid    dates, invalid categories.
- Test regex edge cases: duplicate words, unusual characters, mixed case.
- Test import/export: export JSON, edit file, import valid and invalid files.
- Test keyboard navigation: use Tab/Shift+Tab and Enter, check focus outline.
- Check cap alerts: add/remove transactions to trigger updates.
- 
### Github Pages

https://cherishhub0.github.io/student-finance-tracker/

# Wire frame(link)
https://excalidraw.com/
=======
FinanceTracker

FinanceTracker is a simple web app that helps students (and anyone, really) track their spending, manage budgets, and understand where their money goes.

Built with HTML, CSS, and JavaScript, it includes helpful features like live spending stats, regex search, import/export options, and accessibility support.


Table of Contents
1. About the Project  
2. Main Features  
3. How to Set It Up 
4. How to Use It  
5. Regex catalog
6. Accessibility(ally notes)
7. WireFrame  
8. Demo Video

# About the Project
Managing money as a student can be tough, this app was built to make that easier.  
FinanceTracker helps you record your expenses and income, view visual stats, and get alerts when you’re close to overspending.

You can search through your transactions, export or import your data, and visualize your spending habits with charts.

## Features
- Add, edit, and delete transactions
- Persistent storage via localStorage
- Import/export transactions as JSON
- Regex-powered live search with highlighted results
- Dashboard stats: total transactions, total spent, top category,    average transaction
- Pie chart visualization of spending by category
- Spending cap alerts with ARIA live messages
- Responsive design (mobile-friendly)
- Keyboard-friendly navigation and skip-to-content link

# How to Set It Up
1. Clone the repository
   ```bash
   git clone https://github.com/Cherishhub0/FinanceTracker.git
2. Open the project folder in your code editor.
3. Launch the app by opening index.html in your browser.
(Tip: using Live Server in VS Code makes it smoother)

# How to use it.
1. Add a new record by filling out:
    - Description
    - Amount
    - Category
    - Date
    - and click Add Record.

2. Check the dashboard for:
    - Your total transactions
    - Top category
    - Average spending
    - A live pie chart of your spending

3. You’ll get alerts when you exceed your spending cap (RWF 50,000).
4. Use the search bar to find specific transactions — regex supported!
5. Export your transactions to JSON or import existing ones anytime.

## Regex Catalog

Description: Makes sure the text doesn’t start or end with spaces.
Example: "Lunch", "Coffee shop" |Not: "Lunch", "Coffee "

Amount: Allows numbers, with up to two decimal places. No negative numbers.
Example: 10, 12.50, 1000 | Not: -5, 1.234

Date: Checks for the format YYYY-MM-DD.
Example: 2024-06-15 | Not: 15-06-2024

Category: Only letters and spaces are allowed.
Example : "Food", "Online Shopping" | Not: "Food123"

Duplicate consecutive words: Finds repeated words in a row.
Example matches: "coffee coffee", "the the"

# Accessibility (a11y) Notes
- Semantic HTML: <header>, <nav>, <main>, <section>, <footer>  
- Skip-to-content link for screen reader & keyboard users  
- ARIA live regions for cap alerts:  
  - Polite when under cap  
  - Assertive when exceeded  
- Visible focus states for all interactive elements  
- Color contrast checked for buttons, text, and backgrounds

# How to Run Tests
- Open index.html in a browser.
- Test form validations: missing fields, invalid numbers, invalid    dates, invalid categories.
- Test regex edge cases: duplicate words, unusual characters, mixed case.
- Test import/export: export JSON, edit file, import valid and invalid files.
- Test keyboard navigation: use Tab/Shift+Tab and Enter, check focus outline.
- Check cap alerts: add/remove transactions to trigger updates.

# Wire frame(link)
https://excalidraw.com/
>>>>>>> c6a37e232f1e85c97d89b864c9bd3b6478c80100
# Demo video link
https://www.loom.com/share/85c9a7319188464e8473f38539259e28?sid=0d1a3abe-0b5e-42a8-887d-bea4be5d3c7f
