import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { EmptyState } from '@/components/primitives/EmptyState';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import styles from './ForgotPasswordPage.module.css';

export default function ForgotPasswordPage() {
  const t = useT();
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    navigate('/verify-code', { state: { email } });
  };

  return (
    <div className={styles.container}>
      <EmptyState
        icon={<KeyRound size={56} strokeWidth={1.5} aria-hidden="true" />}
        title={t('auth.forgotPasswordTitle')}
        body={t('auth.forgotPasswordBody')}
        action={
          <form onSubmit={onSubmit} className={styles.form}>
            <Input
              label={t('auth.email')}
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" size="large" block disabled={loading}>
              {loading ? 'Envoi…' : t('auth.sendCode')}
            </Button>
          </form>
        }
      />
      <Link to="/login" className={styles.link}>
        {t('auth.backToLogin')}
      </Link>
    </div>
  );
}
