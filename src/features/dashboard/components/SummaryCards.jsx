import { useDashboardStats } from '../hooks/useDashboardStats';
import { formatCurrency } from '../../../utils/formatters';
import useTransactionStore from '../../../store/transactions/useTransactionStore';
import Spinner from '../../../components/ui/Spinner';
import styles from './SummaryCards.module.css';

function ArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SummaryCard({ label, value, icon, colorClass, trend }) {
  return (
    <div className={`${styles.card} ${styles[colorClass]}`}>
      <div className={styles.cardTop}>
        <span className={styles.label}>{label}</span>
        <div className={styles.iconWrap}>{icon}</div>
      </div>
      <p className={styles.value}>{value}</p>
      {trend && (
        <div className={`${styles.trend} ${styles[trend.dir]}`}>
          {trend.dir === 'up' ? <ArrowUp /> : <ArrowDown />}
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
}

function SummaryCards() {
  const loading = useTransactionStore((s) => s.loading);
  const { balance, income, expenses } = useDashboardStats();

  if (loading) {
    return (
      <div className={styles.loadingRow}>
        <Spinner size="lg" />
      </div>
    );
  }

  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  return (
    <div className={styles.grid}>
      <SummaryCard
        label="Total Balance"
        value={formatCurrency(balance)}
        colorClass="balance"
        icon={<WalletIcon />}
        trend={{ dir: balance >= 0 ? 'up' : 'down', label: `${Math.abs(savingsRate)}% savings rate` }}
      />
      <SummaryCard
        label="Total Income"
        value={formatCurrency(income)}
        colorClass="income"
        icon={<ArrowUp />}
        trend={{ dir: 'up', label: 'All time' }}
      />
      <SummaryCard
        label="Total Expenses"
        value={formatCurrency(expenses)}
        colorClass="expense"
        icon={<ArrowDown />}
        trend={{ dir: 'down', label: 'All time' }}
      />
    </div>
  );
}

export default SummaryCards;
