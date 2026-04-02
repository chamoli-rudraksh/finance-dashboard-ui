import { formatCurrency, formatDate } from '../../../utils/formatters';
import Badge from '../../../components/ui/Badge';
import styles from './TransactionTable.module.css';
import useTransactionStore from '../../../store/transactions/useTransactionStore';
import EmptyState from '../../../components/ui/EmptyState';

function SortIcon({ active, dir }) {
  return (
    <span className={`${styles.sortIcon} ${active ? styles.sortActive : ''}`}>
      {active && dir === 'asc' ? '↑' : '↓'}
    </span>
  );
}

function TransactionTable({ transactions, isAdmin, onEdit, onDelete }) {
  const filters = useTransactionStore((s) => s.filters);
  const setFilters = useTransactionStore((s) => s.setFilters);

  const handleSort = (key) => {
    if (filters.sortBy === key) {
      setFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      setFilters({ sortBy: key, sortDir: 'desc' });
    }
  };

  if (transactions.length === 0) {
    return <EmptyState title="No transactions found" description="Try adjusting your filters or add a new transaction." />;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th} onClick={() => handleSort('date')}>
              Date <SortIcon active={filters.sortBy === 'date'} dir={filters.sortDir} />
            </th>
            <th className={styles.th} onClick={() => handleSort('title')}>
              Title <SortIcon active={filters.sortBy === 'title'} dir={filters.sortDir} />
            </th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Type</th>
            <th className={`${styles.th} ${styles.right}`} onClick={() => handleSort('amount')}>
              Amount <SortIcon active={filters.sortBy === 'amount'} dir={filters.sortDir} />
            </th>
            {isAdmin && <th className={`${styles.th} ${styles.right}`}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className={styles.row}>
              <td className={styles.td}>{formatDate(tx.date)}</td>
              <td className={styles.td}>
                <span className={styles.txTitle}>{tx.title}</span>
              </td>
              <td className={styles.td}>
                <Badge>{tx.category}</Badge>
              </td>
              <td className={styles.td}>
                <Badge type={tx.type}>{tx.type}</Badge>
              </td>
              <td className={`${styles.td} ${styles.right} ${tx.type === 'income' ? styles.incomeAmount : styles.expenseAmount}`}>
                {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
              </td>
              {isAdmin && (
                <td className={`${styles.td} ${styles.right}`}>
                  <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => onEdit(tx)} aria-label="Edit transaction">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className={styles.deleteBtn} onClick={() => onDelete(tx)} aria-label="Delete transaction">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;