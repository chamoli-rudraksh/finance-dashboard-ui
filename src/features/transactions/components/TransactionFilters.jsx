import useTransactionStore from '../../../store/transactions/useTransactionStore';
import { ALL_CATEGORIES } from '../../../constants/categories';
import styles from './TransactionFilters.module.css';

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function TransactionFilters({ onAdd, isAdmin }) {
  const filters = useTransactionStore((s) => s.filters);
  const setFilters = useTransactionStore((s) => s.setFilters);
  const resetFilters = useTransactionStore((s) => s.resetFilters);
  const transactions = useTransactionStore((s) => s.transactions);

  const hasActiveFilters = filters.search || filters.category || filters.type || filters.startDate || filters.endDate;

  const exportCSV = () => {
    if(!transactions.length) return;
    const header = ['ID,Date,Title,Amount,Type,Category'];
    const rows = transactions.map(t => `${t.id},${t.date},"${t.title.replace(/"/g, '""')}",${t.amount},${t.type},${t.category}`);
    const csvContent = header.concat(rows).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if(!transactions.length) return;
    const jsonContent = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            id="tx-search"
            type="text"
            className={styles.searchInput}
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        <select
          id="tx-category-filter"
          className={styles.select}
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className={styles.typeToggle}>
          {['', 'income', 'expense'].map((type) => (
            <button
              key={type}
              className={`${styles.typeBtn} ${filters.type === type ? styles.active : ''} ${type ? styles[type] : ''}`}
              onClick={() => setFilters({ type })}
            >
              {type === '' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <input 
          type="date" 
          className={styles.dateInput} 
          value={filters.startDate}
          onChange={(e) => setFilters({ startDate: e.target.value })}
          aria-label="Start Date"
        />
        <input 
          type="date" 
          className={styles.dateInput} 
          value={filters.endDate}
          onChange={(e) => setFilters({ endDate: e.target.value })}
          aria-label="End Date"
        />

        <select
          id="tx-sort"
          className={styles.select}
          value={`${filters.sortBy}-${filters.sortDir}`}
          onChange={(e) => {
            const [sortBy, sortDir] = e.target.value.split('-');
            setFilters({ sortBy, sortDir });
          }}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High)</option>
          <option value="amount-asc">Amount (Low)</option>
          <option value="title-asc">Name (A–Z)</option>
        </select>

        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={resetFilters}>Clear</button>
        )}
      </div>

      <div className={styles.actionControls}>
        <div className={styles.exportGroup}>
          <button className={styles.exportBtn} onClick={exportCSV} title="Export to CSV">
            <ExportIcon /> CSV
          </button>
          <button className={styles.exportBtn} onClick={exportJSON} title="Export to JSON">
            <ExportIcon /> JSON
          </button>
        </div>

        {isAdmin && (
          <button id="add-transaction-btn" className={styles.addBtn} onClick={onAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Transaction
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionFilters;
