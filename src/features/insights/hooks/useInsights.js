import { useMemo } from 'react';
import useTransactionStore from '../../../store/transactions/useTransactionStore';
import { getMonthKey } from '../../../utils/formatters';

export function useInsights() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const expensesByCategory = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        expensesByCategory[t.category] = (expensesByCategory[t.category] ?? 0) + t.amount;
      });

    const categoryRanking = Object.entries(expensesByCategory)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);

    const highestCategory = categoryRanking[0] ?? null;

    const monthMap = {};
    transactions.forEach((t) => {
      const key = getMonthKey(t.date);
      if (!monthMap[key]) monthMap[key] = { income: 0, expenses: 0, label: '' };
      const d = new Date(t.date);
      monthMap[key].label = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      if (t.type === 'income') monthMap[key].income += t.amount;
      else monthMap[key].expenses += t.amount;
    });

    const sortedMonths = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, data]) => ({ key, ...data, net: data.income - data.expenses }));

    const lastTwo = sortedMonths.slice(-2);
    const monthComparison =
      lastTwo.length === 2
        ? {
            current: lastTwo[1],
            previous: lastTwo[0],
            expenseChange:
              lastTwo[0].expenses > 0
                ? Math.round(((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100)
                : 0,
          }
        : null;

    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

    const avgMonthlyExpense =
      sortedMonths.length > 0
        ? Math.round(sortedMonths.reduce((s, m) => s + m.expenses, 0) / sortedMonths.length)
        : 0;

    return {
      categoryRanking,
      highestCategory,
      monthlyData: sortedMonths,
      monthComparison,
      savingsRate,
      avgMonthlyExpense,
    };
  }, [transactions]);
}
