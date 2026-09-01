import styles from './Switch.module.css';

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  'aria-label': string;
}

export function Switch({ checked, onChange, 'aria-label': ariaLabel }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`${styles.switch} ${checked ? styles.switchOn : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={styles.thumb} />
    </button>
  );
}
