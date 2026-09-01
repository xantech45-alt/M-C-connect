import { Chip } from '@/components/primitives/Chip';
import styles from './ChipFilterGroup.module.css';

export interface FilterOption<V extends string = string> {
  value: V;
  label: string;
}

interface Props<V extends string> {
  options: FilterOption<V>[];
  value: V;
  onChange: (v: V) => void;
  ariaLabel?: string;
}

export function ChipFilterGroup<V extends string>({ options, value, onChange, ariaLabel }: Props<V>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={styles.group}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className={styles.btn}
          onClick={() => onChange(opt.value)}
        >
          <Chip tone={opt.value === value ? 'danger' : 'neutral'}>{opt.label}</Chip>
        </button>
      ))}
    </div>
  );
}
