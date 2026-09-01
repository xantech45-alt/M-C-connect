import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/primitives/Button';
import { PasswordInput } from '@/components/primitives/PasswordInput';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import styles from './ResetPasswordPage.module.css';

function passwordStrength(password: string): { score: 0 | 1 | 2 | 3 | 4; labelKey: string } {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const labelKey =
    score <= 1
      ? 'auth.passwordStrengthWeak'
      : score <= 3
        ? 'auth.passwordStrengthMedium'
        : 'auth.passwordStrengthStrong';
  return { score: score as 0 | 1 | 2 | 3 | 4, labelKey };
}

export default function ResetPasswordPage() {
  const t = useT();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(password), [password]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmError('Les mots de passe ne correspondent pas');
      return;
    }
    setConfirmError(undefined);
    setLoading(true);
    await resetPassword(password);
    setLoading(false);
    navigate('/reset-success');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('auth.resetPasswordTitle')}</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <div>
          <PasswordInput
            label={t('auth.newPassword')}
            id="reset-password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.strengthMeter} role="img" aria-label={`Force du mot de passe : ${t(strength.labelKey)}`}>
            {[0, 1, 2, 3].map((segment) => (
              <span
                key={segment}
                className={`${styles.strengthSegment} ${segment < strength.score ? styles[`strength-${strength.score}`] : ''}`}
              />
            ))}
          </div>
          {password.length > 0 && <span className={styles.strengthLabel}>{t(strength.labelKey)}</span>}
        </div>
        <PasswordInput
          label={t('auth.confirmNewPassword')}
          id="reset-confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmError}
          required
        />
        <Button type="submit" variant="primary" size="large" block disabled={loading}>
          {loading ? 'Enregistrement…' : t('common.save')}
        </Button>
      </form>
    </div>
  );
}
