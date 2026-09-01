import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useT } from '@/state/LocaleProvider';
import { Input } from './Input';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helper?: string;
  error?: string;
}

/** Password field with a show/hide toggle. Wraps Input so both share label/error/a11y wiring. */
export const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { label, helper, error, ...rest },
  ref,
) {
  const t = useT();
  const [visible, setVisible] = useState(false);

  return (
    <Input
      ref={ref}
      label={label}
      helper={helper}
      error={error}
      type={visible ? 'text' : 'password'}
      autoComplete={rest.autoComplete ?? 'current-password'}
      trailingIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t('auth.hidePassword') : t('auth.showPassword')}
        >
          {visible ? <EyeOff size={18} strokeWidth={1.5} aria-hidden="true" /> : <Eye size={18} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      }
      {...rest}
    />
  );
});
