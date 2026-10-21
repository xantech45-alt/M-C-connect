import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/primitives/Card';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { Section } from '@/components/primitives/Section';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { useToast } from '@/components/ui/Toast';
import styles from './RequestQuotePage.module.css';

type Incoterm = 'EXW' | 'CIF' | 'DAP';

export default function RequestQuotePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    productName: '',
    quantity: '',
    targetPriceXof: '',
    incoterm: 'CIF' as Incoterm,
    destination: 'Bamako',
    deadline: '',
    notes: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', 'Demande envoyée à M&C Connect.');
    navigate('/rfq/received');
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <Section variant="flat" spacing="sm" ariaLabel="Introduction">
        <h1 className={styles.title}>Demander un devis</h1>
        <p className={styles.body}>
          M&amp;C Connect reviendra vers vous sous 24 h ouvrées avec un prix ferme, une estimation de
          délai et les options de paiement.
        </p>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Produit recherché">
        <h2 className={styles.h2}>Produit recherché</h2>
        <Input
          label="Description produit"
          value={form.productName}
          onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
          placeholder="Ex : Tissu wax 6 yards"
          required
        />
        <div className={styles.row2}>
          <Input
            label="Quantité cible"
            type="number"
            inputMode="numeric"
            value={form.quantity}
            onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
            required
          />
          <Input
            label="Prix cible unitaire (FCFA)"
            type="number"
            inputMode="numeric"
            value={form.targetPriceXof}
            onChange={(e) => setForm((f) => ({ ...f, targetPriceXof: e.target.value }))}
            placeholder="Optionnel"
          />
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Livraison">
        <h2 className={styles.h2}>Livraison</h2>
        <div>
          <label className={styles.fieldLabel}>Incoterm</label>
          <ChipFilterGroup
            ariaLabel="Incoterm"
            value={form.incoterm}
            onChange={(v) => setForm((f) => ({ ...f, incoterm: v as Incoterm }))}
            options={[
              { value: 'EXW', label: 'EXW' },
              { value: 'CIF', label: 'CIF' },
              { value: 'DAP', label: 'DAP Bamako' },
            ]}
          />
        </div>
        <Input
          label="Destination"
          value={form.destination}
          onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
          required
        />
        <Input
          label="Délai souhaité"
          type="date"
          value={form.deadline}
          onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
        />
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Notes">
        <h2 className={styles.h2}>Notes pour M&amp;C</h2>
        <Input
          label="Spécifications, exigences qualité, packaging…"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Précisez tout ce qui peut aider M&C à sourcer exactement votre besoin"
        />
      </Section>

      <Card>
        <p className={styles.disclaimer}>
          En envoyant cette demande, vous acceptez que M&amp;C Connect traite vos informations dans
          le cadre de la recherche de fournisseurs, du contrôle qualité et de la coordination
          logistique. Aucun paiement ne quitte votre compte avant validation d&apos;une pro forma.
        </p>
      </Card>

      <StickyActionBar>
        <Button variant="primary" size="large" block type="submit">
          Envoyer la demande
        </Button>
      </StickyActionBar>
    </form>
  );
}