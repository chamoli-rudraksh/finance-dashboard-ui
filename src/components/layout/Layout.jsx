import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Toast from '../feedback/Toast';
import useAppStore from '../../store/app/useAppStore';
import useTransactionStore from '../../store/transactions/useTransactionStore';
import styles from './Layout.module.css';

function Layout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const theme = useAppStore((s) => s.theme);
  const toasts = useAppStore((s) => s.toasts);
  const removeToast = useAppStore((s) => s.removeToast);
  const loadTransactions = useTransactionStore((s) => s.loadTransactions);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={`${styles.main} ${sidebarCollapsed ? styles.collapsed : ''}`}>
        <Topbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      <div className={styles.toastStack}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  );
}

export default Layout;
