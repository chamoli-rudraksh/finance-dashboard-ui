import { useInsights } from '../hooks/useInsights';
import { formatCurrency } from '../../../utils/formatters';
import styles from './InsightCards.module.css';

function InsightCard({ title, value, subtext, colorClass, icon }) {
  return (
    <div className={`${styles.card} ${styles[colorClass]}`}>
      <div className={styles.iconWrap}>{icon}</div>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.cardValue}>{value}</p>
      {subtext && <p className={styles.cardSub}>{subtext}</p>}
    </div>
  );
}

function IconFire() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  );
}

function IconTrend() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconPiggy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8.5 3.4 1.5 4.5L7 22h4l1-1h2l1 1h4v-3.5c1.5-1.5 2-3.5 2-5.5 0-2.5-1.5-4.5-3-5zM6 14v-2" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InsightCards() {
  const { highestCategory, monthComparison, savingsRate, avgMonthlyExpense } = useInsights();

  return (
    <div className={styles.grid}>
      <InsightCard
        title="Top Spending Category"
        value={highestCategory?.name ?? '—'}
        subtext={highestCategory ? `${formatCurrency(highestCategory.total)} total spent` : 'No data'}
        colorClass="danger"
        icon={<IconFire />}
      />
      <InsightCard
        title="Month-on-Month Expenses"
        value={
          monthComparison
            ? `${monthComparison.expenseChange > 0 ? '+' : ''}${monthComparison.expenseChange}%`
            : '—'
        }
        subtext={
          monthComparison
            ? `vs ${monthComparison.previous.label} (${formatCurrency(monthComparison.previous.expenses)})`
            : 'Need 2+ months of data'
        }
        colorClass={monthComparison?.expenseChange > 0 ? 'danger' : 'success'}
        icon={<IconTrend />}
      />
      <InsightCard
        title="Savings Rate"
        value={`${savingsRate}%`}
        subtext={`Avg monthly expense: ${formatCurrency(avgMonthlyExpense)}`}
        colorClass="primary"
        icon={<IconPiggy />}
      />
    </div>
  );
}

export default InsightCards;
