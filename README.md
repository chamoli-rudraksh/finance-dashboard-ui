# FinTrack: Finance Dashboard

FinTrack is a modern finance dashboard built using React. It allows users to track transactions, visualize financial data, and gain simple insights through a clean and responsive interface.

---

## Objective

The goal of this project is to demonstrate frontend development skills including UI design, component structure, state management, and user experience.

---

## Features

### Dashboard

* Summary cards for Total Balance, Income, and Expenses
* Balance trend visualization
* Spending breakdown by category

### Transactions

* View all transactions with date, amount, category, and type
* Add, edit, and delete transactions
* Search, filter, and sort functionality

### Role-Based UI

* Viewer mode: read-only access
* Admin mode: can manage transactions

### Insights

* Highest spending category
* Monthly comparison
* Basic derived observations from transaction data

### User Experience

* Responsive layout for different screen sizes
* Dark mode support
* Empty states and loading indicators
* Toast notifications for actions

---

## Technical Approach

* Built with React (Vite) and CSS Modules
* Feature-based folder structure for scalability
* Zustand for state management (transactions, role, UI state)
* Mock API and localStorage used for data persistence

---

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the development server

   ```bash
   npm run dev
   ```

---

## Notes

This project is frontend-only and uses mock data to simulate real-world interactions.
