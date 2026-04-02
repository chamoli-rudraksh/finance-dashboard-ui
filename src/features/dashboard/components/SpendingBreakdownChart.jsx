import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { formatCurrency } from '../../../utils/formatters';
import { CHART_COLORS } from '../../../constants/categories';
import styles from './SpendingBreakdownChart.module.css';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipName}>{name}</p>
      <p className={styles.tooltipValue}>{formatCurrency(value)}</p>
    </div>
  );
}

function SpendingBreakdownChart() {
  const { categoryBreakdown, expenses } = useDashboardStats();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>Spending Breakdown</p>
        <p className={styles.subtitle}>By category</p>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryBreakdown}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              dataKey="value"
              paddingAngle={2}
            >
              {categoryBreakdown.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.center}>
          <p className={styles.centerLabel}>Total</p>
          <p className={styles.centerValue}>{formatCurrency(expenses)}</p>
        </div>
      </div>

      <div className={styles.legend}>
        {categoryBreakdown.slice(0, 5).map((item, i) => (
          <div key={item.name} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className={styles.legendName}>{item.name}</span>
            <span className={styles.legendValue}>{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpendingBreakdownChart;