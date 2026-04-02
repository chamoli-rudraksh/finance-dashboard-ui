import { useMemo } from 'react';
import useTransactionStore from '../../../store/transactions/useTransactionStore';
import { getMonthKey, getMonthYear } from '../../../utils/formatters';

function getLast6MonthKeys() {
  const result = [];
  const now = new Date(2026, 3, 1);
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    });
  }
  return result;
}

export function useDashboardStats() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    const months = getLast6MonthKeys();
    const monthMap = {};
    transactions.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0 };
      if (t.type === 'income') monthMap[key].income += t.amount;
      else monthMap[key].expenses += t.amount;
    });

    const monthlyData = months.map(({ key, label }) => ({
      month: label,
      income: monthMap[key]?.income ?? 0,
      expenses: monthMap[key]?.expenses ?? 0,
      net: (monthMap[key]?.income ?? 0) - (monthMap[key]?.expenses ?? 0),
    }));

    const categoryMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] ?? 0) + t.amount;
      });

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { income, expenses, balance, monthlyData, categoryBreakdown };
  }, [transactions]);
}
