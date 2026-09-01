import { useState } from 'react';
import type { FormEvent } from 'react';
import { Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { PasswordInput } from '@/components/primitives/PasswordInput';
import { Switch } from '@/components/primitives/Switch';
import { Card } from '@/components/primitives/Card';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Divider } from '@/components/primitives/Divider';
import { useAuth } from '@/state/AuthProvider';
import { useToast } from '@/components/ui/Toast';
import { useT } from '@/state/LocaleProvider';
import styles from './SettingsSecurityPage.module.css';

const SESSIONS = [
  { id: 's-1', device: 'Cet appareil - Chrome, Bamako', current: true, icon: Smartphone },
  { id: 's-2', device: 'Ordinateur portable - Firefox, Bamako', current: false, icon: Laptop },
];

export default function SettingsSecurityPage() {
  const t = useT();
  const { resetPassword } = useAuth();
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setConfirmError('Les mots de passe ne correspondent pas');
      return;
    }
    setConfirmError(undefined);
    setLoading(true);
    await resetPassword(newPassword);
    setLoading(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast('success', 'Mot de passe mis à jour');
  };

  const onSignOutSession = (device: string) => toast('info', `Session "${device}" déconnectée`);

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Mot de passe">
        <SectionHeader title="Mot de passe" />
        <Card>
          <form onSubmit={onSubmit} className={styles.form}>
            <PasswordInput
              label="Mot de passe actuel"
              id="security-current-password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <PasswordInput
              label={t('auth.newPassword')}
              id="security-new-password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <PasswordInput
              label={t('auth.confirmNewPassword')}
              id="security-confirm-password"
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
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Authentification à deux facteurs">
        <SectionHeader title="Authentification à deux facteurs" />
        <Card>
          <div className={styles.toggleRow}>
            <div>
              <p className={styles.toggleLabel}>Vérification en deux étapes</p>
              <p className={styles.toggleHelp}>
                Ajoute un code envoyé par SMS à chaque nouvelle connexion.
              </p>
            </div>
            <Switch
              checked={twoFactor}
              onChange={setTwoFactor}
              aria-label="Activer l'authentification à deux facteurs"
            />
          </div>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Sessions actives">
        <SectionHeader title="Sessions actives" />
        <Card>
          <ul className={styles.sessions}>
            {SESSIONS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.id}>
                  {i > 0 && <Divider spacing="none" />}
                  <div className={styles.session}>
                    <span className={styles.sessionIcon}>
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className={styles.sessionBody}>
                      <span className={styles.sessionDevice}>{s.device}</span>
                      {s.current && <span className={styles.sessionCurrent}>Session actuelle</span>}
                    </span>
                    {!s.current && (
                      <button type="button" className={styles.sessionSignOut} onClick={() => onSignOutSession(s.device)}>
                        Déconnecter
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </Section>
    </div>
  );
}
