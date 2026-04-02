import { useState } from 'react';
import useRoleStore from '../store/role/useRoleStore';
import useTransactionStore from '../store/transactions/useTransactionStore';
import useAppStore from '../store/app/useAppStore';
import { useFilteredTransactions } from '../features/transactions/hooks/useFilteredTransactions';
import TransactionFilters from '../features/transactions/components/TransactionFilters';
import TransactionTable from '../features/transactions/components/TransactionTable';
import TransactionForm from '../features/transactions/components/TransactionForm';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import styles from './TransactionsPage.module.css';

function TransactionsPage() {
  const role = useRoleStore((s) => s.role);
  const isAdmin = role === 'admin';
  const loading = useTransactionStore((s) => s.loading);
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const updateTransaction = useTransactionStore((s) => s.updateTransaction);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);
  const addToast = useAppStore((s) => s.addToast);
  const filtered = useFilteredTransactions();

  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const openAdd = () => setModal({ mode: 'add', tx: null });
  const openEdit = (tx) => setModal({ mode: 'edit', tx });
  const openDelete = (tx) => setModal({ mode: 'delete', tx });
  const closeModal = () => setModal(null);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      if (modal.mode === 'add') {
        await addTransaction(data);
        addToast('Transaction added successfully!');
      } else {
        await updateTransaction(modal.tx.id, data);
        addToast('Transaction updated!');
      }
      closeModal();
    } catch {
      addToast('Something went wrong.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteTransaction(modal.tx.id);
      addToast('Transaction deleted.', 'success');
      closeModal();
    } catch {
      addToast('Failed to delete.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <TransactionFilters onAdd={openAdd} isAdmin={isAdmin} />

      {loading ? (
        <div className={styles.loadingWrap}>
          <Spinner size="lg" />
        </div>
      ) : (
        <TransactionTable
          transactions={filtered}
          isAdmin={isAdmin}
          onEdit={openEdit}
          onDelete={openDelete}
        />
      )}

      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={closeModal}
        title={modal?.mode === 'add' ? 'Add Transaction' : 'Edit Transaction'}
      >
        <TransactionForm
          initial={modal?.tx}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={saving}
        />
      </Modal>

      <Modal isOpen={modal?.mode === 'delete'} onClose={closeModal} title="Delete Transaction">
        <div className={styles.deleteBody}>
          <p className={styles.deleteText}>
            Are you sure you want to delete <strong>{modal?.tx?.title}</strong>? This cannot be undone.
          </p>
          <div className={styles.deleteActions}>
            <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
            <button className={styles.confirmDeleteBtn} onClick={handleDelete} disabled={saving}>
              {saving ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TransactionsPage;