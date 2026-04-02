import { useInsights } from '../hooks/useInsights';
import { formatCurrency } from '../../../utils/formatters';
import { CHART_COLORS } from '../../../constants/categories';
import styles from './CategoryBreakdownTable.module.css';

function CategoryBreakdownTable() {
  const { categoryRanking } = useInsights();
  const total = categoryRanking.reduce((s, c) => s + c.total, 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>Category Breakdown</p>
        <p className={styles.subtitle}>Ranked by spend</p>
      </div>

      {categoryRanking.length === 0 ? (
        <p className={styles.empty}>No expense data available.</p>
      ) : (
        <div className={styles.list}>
          {categoryRanking.map((item, i) => {
            const pct = total > 0 ? Math.round((item.total / total) * 100) : 0;
            return (
              <div key={item.name} className={styles.item}>
                <div className={styles.itemLeft}>
                  <span
                    className={styles.rank}
                    style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                  >
                    {i + 1}
                  </span>
                  <span className={styles.name}>{item.name}</span>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.barWrap}>
                    <div
                      className={styles.bar}
                      style={{
                        width: `${pct}%`,
                        background: CHART_COLORS[i % CHART_COLORS.length],
                      }}
                    />
                  </div>
                  <span className={styles.pct}>{pct}%</span>
                  <span className={styles.amount}>{formatCurrency(item.total)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryBreakdownTable;
