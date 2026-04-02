import styles from './Badge.module.css';

function Badge({ children, type = 'default' }) {
  return (
    <span className={`${styles.badge} ${styles[type]}`}>{children}</span>
  );
}

export default Badge;
