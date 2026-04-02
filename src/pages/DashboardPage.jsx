import SummaryCards from '../features/dashboard/components/SummaryCards';
import BalanceChart from '../features/dashboard/components/BalanceChart';
import SpendingBreakdownChart from '../features/dashboard/components/SpendingBreakdownChart';
import styles from './DashboardPage.module.css';

function DashboardPage() {
  return (
    <>
      <SummaryCards />
      <div className={styles.charts}>
        <BalanceChart />
        <SpendingBreakdownChart />
      </div>
    </>
  );
}

export default DashboardPage;