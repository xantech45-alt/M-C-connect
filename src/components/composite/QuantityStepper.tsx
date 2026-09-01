import { Minus, Plus } from 'lucide-react';
import { IconButton } from '@/components/primitives/IconButton';
import styles from './QuantityStepper.module.css';

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
  label?: string;
}

export function QuantityStepper({ value, min = 1, max = 9999, onChange, label }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div className={styles.stepper} role="group" aria-label={label ?? 'Quantité'}>
      <IconButton aria-label="Diminuer la quantité" icon={<Minus size={18} strokeWidth={1.5} />} onClick={dec} disabled={value <= min} />
      <span className={styles.value} aria-live="polite" aria-atomic="true">{value}</span>
      <IconButton aria-label="Augmenter la quantité" icon={<Plus size={18} strokeWidth={1.5} />} onClick={inc} disabled={value >= max} />
    </div>
  );
}
