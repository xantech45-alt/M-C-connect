import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { EmptyState } from '@/components/primitives/EmptyState';
import { IconButton } from '@/components/primitives/IconButton';
import { Image } from '@/components/primitives/Image';
import { QuantityStepper } from '@/components/composite/QuantityStepper';
import { StickyActionBar } from '@/components/composite/StickyActionBar';
import { Section } from '@/components/primitives/Section';
import { useCart } from '@/state/CartProvider';
import { useToast } from '@/components/ui/Toast';
import { getProductById } from '@/state/catalog';
import { coupons } from '@/state/coupons';
import { getCartCustomerTotal, formatXof } from '@/domain/pricing';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { lines, update, remove, subtotalXof } = useCart();
  const toast = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  if (lines.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="Votre panier est vide"
          body="Ajoutez des produits ou demandez un devis sur mesure à M&C Connect."
          action={
            <div className={styles.emptyActions}>
              <Button onClick={() => navigate('/home')} variant="primary" size="large" block>
                Découvrir les produits
              </Button>
              <Button onClick={() => navigate('/rfq/new')} variant="tertiary" size="large" block>
                Demander un sourcing
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const estimatedTotal = getCartCustomerTotal(lines);

  const onApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    const match = coupons.find((c) => c.code === code && c.status === 'active');
    if (match) {
      toast('success', `Coupon ${match.code} appliqué - ${match.discountLabel}`);
    } else {
      toast('error', 'Code promo invalide ou expiré');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Panier ({itemCount})</h1>
        <button type="button" className={styles.editToggle} onClick={() => setEditing((v) => !v)}>
          {editing ? 'Terminé' : 'Modifier'}
        </button>
      </div>

      {/* Tablet landscape (>=1024px): items and summary sit side by side. */}
      <div className={styles.splitRow}>
      <div className={styles.splitLeft}>
      <Section variant="flat" spacing="md" ariaLabel="Articles">
        <ul className={styles.lines}>
          {lines.map((line) => {
            const product = getProductById(line.productId);
            return (
              <li key={line.productId} className={styles.line}>
                <div className={styles.thumb}>
                  <Image src={product?.imageUrl} alt="" width={64} height={64} ratio="1/1" loading="lazy" />
                </div>
                <div className={styles.body}>
                  <Link to={`/product/${line.productId}`} className={styles.title}>
                    {product?.title ?? line.productId}
                  </Link>
                  {product?.shortSpecs[0] && <p className={styles.variant}>{product.shortSpecs[0]}</p>}
                  <p className={styles.unit}>
                    {line.unitPriceXof.toLocaleString('fr-FR')} FCFA / unité
                  </p>
                  <div className={styles.qtyRow}>
                    <QuantityStepper
                      value={line.quantity}
                      min={line.moq}
                      onChange={(q) => update(line.productId, q)}
                      label={`Quantité ${product?.title ?? ''}`}
                    />
                    <span className={styles.subtotal}>
                      {(line.unitPriceXof * line.quantity).toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
                {editing && (
                  <IconButton
                    aria-label="Retirer du panier"
                    icon={<Trash2 size={18} strokeWidth={1.5} />}
                    onClick={() => remove(line.productId)}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Code promo">
        <form onSubmit={onApplyPromo} className={styles.promoRow}>
          <label htmlFor="promo-code" className={styles.srOnly}>Code promo</label>
          <input
            id="promo-code"
            type="text"
            placeholder="Code promo"
            className={styles.promoInput}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button type="submit" variant="secondary">Appliquer</Button>
        </form>
      </Section>
      </div>

      <div className={styles.splitRight}>
      <Section variant="surface" spacing="md" ariaLabel="Récapitulatif">
        <div className={styles.summaryRow}>
          <span>Sous-total</span>
          <strong>{subtotalXof.toLocaleString('fr-FR')} FCFA</strong>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryMuted}>
            Livraison
            <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className={styles.summaryMuted}>calculée à l&apos;étape suivante</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Total estimé</span>
          <strong className={styles.summaryTotal}>
            ≈ {formatXof(estimatedTotal.totalXof)}
          </strong>
        </div>
        <div className={styles.guarantee}>
          <ShieldCheck size={14} strokeWidth={1.5} aria-hidden="true" />
          Aucun paiement avant validation de la facture pro forma
        </div>
      </Section>
      </div>
      </div>

      <StickyActionBar>
        <div className={styles.checkoutSlot}>
          <Button
            variant="primary"
            size="large"
            block
            leadingIcon={<Lock size={16} strokeWidth={1.5} aria-hidden="true" />}
            onClick={() => navigate('/checkout/review')}
          >
            Passer à la caisse
          </Button>
          <p className={styles.secureCaption}>Paiement 100% sécurisé</p>
        </div>
      </StickyActionBar>
    </div>
  );
}
