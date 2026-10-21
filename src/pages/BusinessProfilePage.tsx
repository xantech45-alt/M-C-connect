import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/state/AuthProvider';
import { useT } from '@/state/LocaleProvider';
import styles from './BusinessProfilePage.module.css';

export default function BusinessProfilePage() {
  const t = useT();
  const { completeProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    industry: '',
    contactName: '',
    phone: '',
    email: '',
    address: '',
  });

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeProfile(form);
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profil entreprise</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="bp-name">Nom *</label>
        <input id="bp-name" className={styles.input} required autoComplete="organization" value={form.name} onChange={onChange('name')} />
        <label className={styles.label} htmlFor="bp-industry">Secteur d&apos;activité</label>
        <input id="bp-industry" className={styles.input} value={form.industry} onChange={onChange('industry')} />
        <label className={styles.label} htmlFor="bp-contact">Personne de contact *</label>
        <input id="bp-contact" className={styles.input} required autoComplete="name" value={form.contactName} onChange={onChange('contactName')} />
        <label className={styles.label} htmlFor="bp-phone">Téléphone *</label>
        <input id="bp-phone" className={styles.input} type="tel" required autoComplete="tel" value={form.phone} onChange={onChange('phone')} />
        <label className={styles.label} htmlFor="bp-email">Email</label>
        <input id="bp-email" className={styles.input} type="email" autoComplete="email" value={form.email} onChange={onChange('email')} />
        <label className={styles.label} htmlFor="bp-address">Adresse</label>
        <input id="bp-address" className={styles.input} autoComplete="street-address" value={form.address} onChange={onChange('address')} />
        <button type="submit" className={styles.cta}>{t('common.save')}</button>
      </form>
    </div>
  );
}
