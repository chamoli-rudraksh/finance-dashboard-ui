import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { formatCurrency } from '../../../utils/formatters';
import styles from './BalanceChart.module.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipIncome}>Income: {formatCurrency(payload[0]?.value ?? 0)}</p>
      <p className={styles.tooltipExpense}>Expenses: {formatCurrency(payload[1]?.value ?? 0)}</p>
      <p className={styles.tooltipNet}>Net: {formatCurrency(payload[2]?.value ?? 0)}</p>
    </div>
  );
}

function BalanceChart() {
  const { monthlyData } = useDashboardStats();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>Balance Trend</p>
        <p className={styles.subtitle}>Last 6 months</p>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${v / 1000}k`}
              tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="income" stroke="var(--color-income)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="expenses" stroke="var(--color-expense)" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="net" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 4, fill: 'var(--color-primary)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem} style={{ '--dot': 'var(--color-income)' }}>Income</span>
        <span className={styles.legendItem} style={{ '--dot': 'var(--color-expense)' }}>Expenses</span>
        <span className={styles.legendItem} style={{ '--dot': 'var(--color-primary)' }}>Net</span>
      </div>
    </div>
  );
}

export default BalanceChart;