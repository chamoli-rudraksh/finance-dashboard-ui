# FinTrack: Premium Finance Dashboard 💎

FinTrack is an enterprise-grade, modern financial dashboard designed for maximum aesthetic appeal, robust functionality, and absolute precision. It is crafted as a perfect hybrid of rich user experience (UX) and clean, scalable code architecture.

## 🌟 Objective

Built to easily summarize financial data, explore transactions intricately, and derive fast insights while ensuring high functionality out-of-the-box including responsive designs, Dark Mode, Role-Based Access Control (RBAC), and persistent data handling.

---

## 🔥 Features Highlight & Evaluation Criteria Met

### 1. Design & Creativity
- **Premium Emerald Theme:** A crafted color palette featuring glassmorphism elements, drop-shadows, and curated fonts. 
- **Time/Category Visuals:** Dynamic, highly-stylized Recharts integrations (Balance Trends, Expense Breakdown, Month-on-Month comparison).

### 2. Responsiveness
- **Adaptive Layout:** Completely fluid via CSS Grid/Flexbox modules perfectly adapting from wide desktop screens to narrow mobile viewports.

### 3. Functionality
- **Transaction Overview:** Add, Edit, Delete, filter by searching, sort direction, category selection, and advanced **Date Array filtering**.
- **Data Export:** Built-in ability to **Export to CSV or JSON** with a simple click.
- **Role-Based Access (RBAC):** Simulated Viewer vs. Admin toggle controls right from the header. Non-admins cannot invoke mutated states.

### 4. User Experience (UX)
- **Dark Mode:** A system-respecting toggle switch.
- **Empty States & Polish:** Detailed empty-states for grids or charts when no data hits filters. Loading spinners accompany every mock API fetch.
- **Smooth Animations:** Hover highlights across buttons, smooth transition overlays on Modals and Toasts.

### 5. Technical Quality & State Management
- **Zustand Architectures:** State split between `app/theme`, `user/role`, and `transactions` using isolated Zustand hooks. It guarantees 0 unnecessary re-renders via component atomic selection.
- **Data Persistence:** UI setups (Dark Mode, sidebar state) AND the **Mock API database** persist via robust `localStorage` integrations.

---

## 🚀 Setup & Execution

1. Clone or unpack the repository.
2. Ensure you have Node.js installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

*The UI requires no further backend and depends heavily on a hyper-realistic native mock service imitating network delays and data-sync arrays natively.*
