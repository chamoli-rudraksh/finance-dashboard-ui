import InsightCards from '../features/insights/components/InsightCards';
import MonthlyComparisonChart from '../features/insights/components/MonthlyComparisonChart';
import CategoryBreakdownTable from '../features/insights/components/CategoryBreakdownTable';

function InsightsPage() {
  return (
    <>
      <InsightCards />
      <MonthlyComparisonChart />
      <CategoryBreakdownTable />
    </>
  );
}

export default InsightsPage;