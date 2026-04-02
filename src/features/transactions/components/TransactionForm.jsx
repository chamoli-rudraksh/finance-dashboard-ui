import { useState, useEffect } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../../constants/categories';
import Button from '../../../components/ui/Button';
import styles from './TransactionForm.module.css';

const EMPTY = { title: '', amount: '', type: 'expense', category: 'Food', date: '' };

function TransactionForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ?? EMPTY);

  useEffect(() => {
    setForm(initial ?? EMPTY);
  }, [initial]);

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const set = (key, value) => {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'type') {
        updated.category = value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="tx-title">Title</label>
        <input
          id="tx-title"
          className={styles.input}
          type="text"
          placeholder="e.g. Salary, Groceries"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tx-amount">Amount (₹)</label>
          <input
            id="tx-amount"
            className={styles.input}
            type="number"
            placeholder="0"
            value={form.amount}
            onChange={(e) => set('amount', e.target.value)}
            min="0"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="tx-date">Date</label>
          <input
            id="tx-date"
            className={styles.input}
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Type</label>
        <div className={styles.typeRow}>
          {['income', 'expense'].map((t) => (
            <label key={t} className={`${styles.typeOption} ${form.type === t ? styles.active : ''} ${styles[t]}`}>
              <input
                type="radio"
                name="type"
                value={t}
                checked={form.type === t}
                onChange={() => set('type', t)}
                className={styles.srOnly}
              />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="tx-category">Category</label>
        <select
          id="tx-category"
          className={styles.input}
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className={styles.footer}>
        <Button variant="secondary" onClick={onCancel} type="button">Cancel</Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving…' : initial ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
}

export default TransactionForm;
