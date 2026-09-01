import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { useAuth } from '@/state/AuthProvider';
import { useToast } from '@/components/ui/Toast';
import { useT } from '@/state/LocaleProvider';
import styles from './PersonalInfoForm.module.css';

const GENDERS = [
  { value: '', label: 'Préférer ne pas préciser' },
  { value: 'female', label: 'Femme' },
  { value: 'male', label: 'Homme' },
  { value: 'other', label: 'Autre' },
];

interface Props {
  /** Where to navigate after a successful save. Defaults to /profile. */
  redirectTo?: string;
}

export function PersonalInfoForm({ redirectTo = '/profile' }: Props) {
  const t = useT();
  const { company, completeProfile } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(company?.contactName ?? '');
  const [email, setEmail] = useState(company?.email ?? '');
  const [phone, setPhone] = useState((company?.phone ?? '').replace(/^\+223\s?/, ''));
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  const onAvatarClick = () => toast('info', 'Bientôt disponible');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    completeProfile({
      legalName: company?.legalName ?? '',
      registrationNumber: company?.registrationNumber,
      taxId: company?.taxId,
      industry: company?.industry,
      address: company?.address,
      contactName: fullName,
      email,
      phone: `+223 ${phone}`.trim(),
    });
    setLoading(false);
    toast('success', 'Informations mises à jour');
    navigate(redirectTo);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <User size={32} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <button
            type="button"
            className={styles.cameraBadge}
            aria-label="Changer la photo de profil"
            onClick={onAvatarClick}
          >
            <Camera size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      <Input
        label={t('auth.fullName')}
        id="personal-name"
        autoComplete="name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <Input
        label={t('auth.email')}
        id="personal-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className={styles.phoneRow}>
        <label htmlFor="personal-phone" className={styles.phoneLabel}>
          {t('auth.phone')}
        </label>
        <div className={styles.phoneField}>
          <span className={styles.phonePrefix} aria-hidden="true">+223</span>
          <input
            id="personal-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className={styles.phoneInput}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>
      <Input
        label="Date de naissance"
        id="personal-dob"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <div className={styles.selectWrapper}>
        <label htmlFor="personal-gender" className={styles.selectLabel}>
          Genre
        </label>
        <select id="personal-gender" className={styles.select} value={gender} onChange={(e) => setGender(e.target.value)}>
          {GENDERS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" variant="primary" size="large" block disabled={loading}>
        {loading ? 'Enregistrement…' : 'Enregistrer les modifications'}
      </Button>
    </form>
  );
}
