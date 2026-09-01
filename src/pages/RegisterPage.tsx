import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { PasswordInput } from '@/components/primitives/PasswordInput';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const t = useT();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmError, setConfirmError] = useState<string | undefined>();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmError('Les mots de passe ne correspondent pas');
      return;
    }
    setConfirmError(undefined);
    setLoading(true);
    await register({ fullName, email, phone, password });
    setLoading(false);
    navigate('/profile-setup');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Créer un compte</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          label={t('auth.fullName')}
          id="register-name"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          label={t('auth.email')}
          id="register-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('auth.phone')}
          id="register-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <PasswordInput
          label={t('auth.password')}
          id="register-password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordInput
          label={t('auth.confirmPassword')}
          id="register-confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmError}
          required
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
          />
          <span>{t('auth.acceptTerms')}</span>
        </label>
        <Button type="submit" variant="primary" size="large" block disabled={loading || !acceptTerms}>
          {loading ? 'Création…' : t('auth.signUp')}
        </Button>
      </form>
      <p className={styles.footer}>
        {t('auth.alreadyAccount')}{' '}
        <Link to="/login" className={styles.link}>
          {t('auth.login')}
        </Link>
      </p>
    </div>
  );
}
