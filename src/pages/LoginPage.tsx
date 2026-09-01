import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Chrome, Apple } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { PasswordInput } from '@/components/primitives/PasswordInput';
import { Divider } from '@/components/primitives/Divider';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import { useToast } from '@/components/ui/Toast';
import styles from './LoginPage.module.css';

type AuthTab = 'email' | 'phone';

export default function LoginPage() {
  const t = useT();
  const toast = useToast();
  const { startLogin, verifyOtp, loginWithPassword } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AuthTab>('email');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneStage, setPhoneStage] = useState<'phone' | 'otp'>('phone');

  const onEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithPassword(email, password);
    setLoading(false);
    navigate('/profile-setup');
  };

  const onPhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await startLogin(phone);
    setLoading(false);
    setPhoneStage('otp');
  };

  const onOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await verifyOtp(otp);
    setLoading(false);
    navigate('/profile-setup');
  };

  const onSocialClick = () => toast('info', t('auth.comingSoon'));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Connexion</h1>

      <div className={styles.tabs} role="tablist" aria-label="Méthode de connexion">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'email'}
          className={`${styles.tab} ${tab === 'email' ? styles.tabActive : ''}`}
          onClick={() => setTab('email')}
        >
          {t('auth.tabEmail')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'phone'}
          className={`${styles.tab} ${tab === 'phone' ? styles.tabActive : ''}`}
          onClick={() => setTab('phone')}
        >
          {t('auth.tabPhone')}
        </button>
      </div>

      {tab === 'email' ? (
        <>
          <form onSubmit={onEmailSubmit} className={styles.form}>
            <Input
              label={t('auth.email')}
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label={t('auth.password')}
              id="login-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.formRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                {t('auth.rememberMe')}
              </label>
              <Link to="/forgot-password" className={styles.link}>
                {t('auth.forgotPassword')}
              </Link>
            </div>
            <Button type="submit" variant="primary" size="large" block disabled={loading}>
              {loading ? 'Connexion…' : t('auth.login')}
            </Button>
          </form>

          <div className={styles.dividerRow}>
            <Divider spacing="none" />
            <span className={styles.dividerLabel}>{t('auth.or')}</span>
            <Divider spacing="none" />
          </div>

          <div className={styles.socialGroup}>
            <Button variant="secondary" size="large" block leadingIcon={<Chrome size={18} strokeWidth={1.5} aria-hidden="true" />} onClick={onSocialClick}>
              {t('auth.continueWithGoogle')}
            </Button>
            <Button variant="secondary" size="large" block leadingIcon={<Apple size={18} strokeWidth={1.5} aria-hidden="true" />} onClick={onSocialClick}>
              {t('auth.continueWithApple')}
            </Button>
          </div>

          <p className={styles.footer}>
            {t('auth.noAccount')}{' '}
            <Link to="/register" className={styles.link}>
              {t('auth.signUp')}
            </Link>
          </p>
        </>
      ) : phoneStage === 'phone' ? (
        <form onSubmit={onPhoneSubmit} className={styles.form}>
          <Input
            label="Numéro de téléphone"
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="large" block disabled={loading}>
            {loading ? 'Envoi…' : t('common.continue')}
          </Button>
        </form>
      ) : (
        <form onSubmit={onOtpSubmit} className={styles.form}>
          <Input
            label="Code de vérification"
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="large" block disabled={loading}>
            {loading ? 'Vérification…' : t('common.confirm')}
          </Button>
        </form>
      )}
    </div>
  );
}
