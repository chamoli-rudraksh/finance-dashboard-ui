import { create } from 'zustand';
import * as api from '../../services/mockApiService';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,
  filters: {
    search: '',
    category: '',
    type: '',
    sortBy: 'date',
    sortDir: 'desc',
    startDate: '',
    endDate: '',
  },

  loadTransactions: async () => {
    set({ loading: true });
    try {
      const data = await api.fetchTransactions();
      set({ transactions: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  addTransaction: async (tx) => {
    const newTx = await api.addTransaction(tx);
    set((s) => ({ transactions: [newTx, ...s.transactions] }));
    return newTx;
  },

  updateTransaction: async (id, tx) => {
    const updated = await api.updateTransaction(id, tx);
    set((s) => ({
      transactions: s.transactions.map((t) => (t.id === id ? updated : t)),
    }));
    return updated;
  },

  deleteTransaction: async (id) => {
    await api.deleteTransaction(id);
    set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
  },

  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),

  resetFilters: () =>
    set({ filters: { search: '', category: '', type: '', sortBy: 'date', sortDir: 'desc', startDate: '', endDate: '' } }),
}));

export default useTransactionStore;
