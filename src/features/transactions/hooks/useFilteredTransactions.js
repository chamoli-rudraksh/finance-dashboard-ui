import { useMemo } from 'react';
import useTransactionStore from '../../../store/transactions/useTransactionStore';

export function useFilteredTransactions() {
  const transactions = useTransactionStore((s) => s.transactions);
  const filters = useTransactionStore((s) => s.filters);

  return useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }
    
    if (filters.startDate) {
      result = result.filter((t) => t.date >= filters.startDate);
    }
    
    if (filters.endDate) {
      result = result.filter((t) => t.date <= filters.endDate);
    }

    result.sort((a, b) => {
      const dir = filters.sortDir === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') {
        return dir * (new Date(a.date) - new Date(b.date));
      }
      if (filters.sortBy === 'amount') {
        return dir * (a.amount - b.amount);
      }
      return dir * a.title.localeCompare(b.title);
    });

    return result;
  }, [transactions, filters]);
}
