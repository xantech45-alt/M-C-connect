import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { useAddresses } from '@/state/AddressesProvider';
import { MALI_REGIONS } from '@/state/maliRegions';
import styles from './AddressFormPage.module.css';

export default function AddressFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, addAddress, updateAddress } = useAddresses();
  const existing = useMemo(() => (id ? getById(id) : undefined), [id, getById]);

  const [label, setLabel] = useState(existing?.label ?? '');
  const [recipientName, setRecipientName] = useState(existing?.recipientName ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [region, setRegion] = useState(existing?.region ?? MALI_REGIONS[0]);
  const [quartier, setQuartier] = useState(existing?.quartier ?? '');
  const [repere, setRepere] = useState(existing?.repere ?? '');
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const input = { label, recipientName, phone, region, quartier, repere: repere || undefined };
    if (id && existing) {
      updateAddress(id, input);
    } else {
      addAddress(input);
    }
    setLoading(false);
    navigate('/addresses');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          label="Nom de l'adresse"
          id="address-label"
          placeholder="Domicile, Bureau…"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
        <Input
          label="Nom du destinataire"
          id="address-recipient"
          autoComplete="name"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          required
        />
        <Input
          label="Téléphone"
          id="address-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className={styles.selectWrapper}>
          <label htmlFor="address-region" className={styles.selectLabel}>
            Région
          </label>
          <select
            id="address-region"
            className={styles.select}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {MALI_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Quartier"
          id="address-quartier"
          value={quartier}
          onChange={(e) => setQuartier(e.target.value)}
          required
        />
        <Input
          label="Repère (optionnel)"
          id="address-repere"
          helper="Un point connu à proximité pour faciliter la livraison"
          value={repere}
          onChange={(e) => setRepere(e.target.value)}
        />
        <Button type="submit" variant="primary" size="large" block disabled={loading}>
          {loading ? 'Enregistrement…' : 'Enregistrer'}
        </Button>
      </form>
    </div>
  );
}
