import { useEffect, useRef, useState } from 'react';
import type { ClipboardEvent, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/primitives/Button';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import styles from './VerifyCodePage.module.css';

const CODE_LENGTH = 6;
const EXPIRY_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 58;

function formatMmSs(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function VerifyCodePage() {
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email ?? '';
  const { verifyResetCode, requestPasswordReset } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [expirySeconds, setExpirySeconds] = useState(EXPIRY_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setExpirySeconds((s) => Math.max(0, s - 1));
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const setDigit = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const onChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(-1);
    setDigit(index, value);
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(CODE_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i];
    setDigits(next);
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const code = digits.join('');
  const complete = code.length === CODE_LENGTH;

  const onSubmit = async () => {
    if (!complete) return;
    setLoading(true);
    await verifyResetCode(email, code);
    setLoading(false);
    navigate('/reset-password', { state: { email } });
  };

  const onResend = async () => {
    if (resendCooldown > 0) return;
    await requestPasswordReset(email);
    setExpirySeconds(EXPIRY_SECONDS);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('auth.verifyCodeTitle')}</h1>
      <p className={styles.body}>
        {t('auth.verifyCodeBody')} {email ? <strong>{email}</strong> : null}
      </p>

      <div className={styles.otpGroup} role="group" aria-label="Code de vérification à 6 chiffres">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            className={styles.otpDigit}
            value={digit}
            onChange={onChange(i)}
            onKeyDown={onKeyDown(i)}
            onPaste={onPaste}
            aria-label={`Chiffre ${i + 1} sur ${CODE_LENGTH}`}
          />
        ))}
      </div>

      <p className={styles.expiry}>
        {t('auth.codeExpiresIn')} <strong>{formatMmSs(expirySeconds)}</strong>
      </p>

      <Button type="button" variant="primary" size="large" block disabled={!complete || loading} onClick={onSubmit}>
        {loading ? 'Vérification…' : t('common.confirm')}
      </Button>

      <button type="button" className={styles.resend} disabled={resendCooldown > 0} onClick={onResend}>
        {resendCooldown > 0 ? `${t('auth.resendCode')} (${resendCooldown}s)` : t('auth.resendCode')}
      </button>
    </div>
  );
}
