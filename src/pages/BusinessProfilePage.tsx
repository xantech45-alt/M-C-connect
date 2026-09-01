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
    legalName: '',
    registrationNumber: '',
    taxId: '',
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
        <label className={styles.label}>Raison sociale *</label>
        <input className={styles.input} required value={form.legalName} onChange={onChange('legalName')} />
        <label className={styles.label}>Numéro RCCM</label>
        <input className={styles.input} value={form.registrationNumber} onChange={onChange('registrationNumber')} />
        <label className={styles.label}>NIF</label>
        <input className={styles.input} value={form.taxId} onChange={onChange('taxId')} />
        <label className={styles.label}>Secteur d&apos;activité</label>
        <input className={styles.input} value={form.industry} onChange={onChange('industry')} />
        <label className={styles.label}>Personne de contact *</label>
        <input className={styles.input} required value={form.contactName} onChange={onChange('contactName')} />
        <label className={styles.label}>Téléphone *</label>
        <input className={styles.input} type="tel" required value={form.phone} onChange={onChange('phone')} />
        <label className={styles.label}>Email</label>
        <input className={styles.input} type="email" value={form.email} onChange={onChange('email')} />
        <label className={styles.label}>Adresse</label>
        <input className={styles.input} value={form.address} onChange={onChange('address')} />
        <button type="submit" className={styles.cta}>{t('common.save')}</button>
      </form>
    </div>
  );
}
