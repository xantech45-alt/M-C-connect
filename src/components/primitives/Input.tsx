import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  trailingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, helper, error, trailingIcon, id, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.field}>
        <input
          ref={ref}
          id={inputId}
          className={`${styles.input} ${trailingIcon ? styles.hasTrailing : ''} ${error ? styles.invalid : ''} ${className ?? ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={helper || error ? `${inputId}-help` : undefined}
          {...rest}
        />
        {trailingIcon && <span className={styles.trailing}>{trailingIcon}</span>}
      </div>
      {(helper || error) && (
        <span id={`${inputId}-help`} className={error ? styles.error : styles.helper}>
          {error ?? helper}
        </span>
      )}
    </div>
  );
});
