import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Camera,
  MapPin,
  CreditCard,
  Heart,
  Ticket,
  Star,
  Undo2,
  ClipboardList,
  HelpCircle,
  Mail,
  Info,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Button } from '@/components/primitives/Button';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { NavRow, NavRowList } from '@/components/composite/NavRow';
import { useAuth } from '@/state/AuthProvider';
import { useFavorites } from '@/state/FavoritesProvider';
import { orders } from '@/state/orders';
import { coupons } from '@/state/coupons';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { company, logout } = useAuth();
  const { ids: favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const activeCoupons = coupons.filter((c) => c.status === 'active').length;

  return (
    <div className={styles.container}>
      <Section variant="card" spacing="md" ariaLabel="Identité">
        <Link to="/profile/edit" className={styles.identity}>
          <div className={styles.identityAvatarWrap}>
            <div className={styles.identityAvatar}>
              <Building2 size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <span className={styles.cameraBadge} aria-hidden="true">
              <Camera size={12} strokeWidth={2} />
            </span>
          </div>
          <div className={styles.identityBody}>
            <h1 className={styles.identityName}>{company?.legalName ?? 'Votre entreprise'}</h1>
            <p className={styles.identityMeta}>{company?.contactName ?? 'Profil à compléter'}</p>
            <p className={styles.identityMeta}>{company?.email ?? company?.phone ?? ''}</p>
          </div>
          <ChevronRight size={18} strokeWidth={1.5} className={styles.identityChevron} aria-hidden="true" />
        </Link>
        {!company && (
          <div className={styles.emptyCta}>
            <Button variant="primary" size="large" block onClick={() => navigate('/profile-setup')}>
              Compléter mon profil entreprise
            </Button>
          </div>
        )}
      </Section>

      <Section variant="flat" spacing="sm" ariaLabel="Statistiques">
        <div className={styles.stats}>
          <Link to="/orders" className={styles.stat}>
            <strong className={styles.statValue}>{orders.length}</strong>
            <span className={styles.statLabel}>Commandes</span>
          </Link>
          <Link to="/favorites" className={styles.stat}>
            <strong className={styles.statValue}>{favoriteIds.length}</strong>
            <span className={styles.statLabel}>Favoris</span>
          </Link>
          <Link to="/coupons" className={styles.stat}>
            <strong className={styles.statValue}>{activeCoupons}</strong>
            <span className={styles.statLabel}>Coupons</span>
          </Link>
        </div>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Mon compte">
        <SectionHeader title="Mon compte" />
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<Building2 size={18} strokeWidth={1.5} />} label="Informations personnelles" to="/profile/edit" />
            </li>
            <li>
              <NavRow icon={<MapPin size={18} strokeWidth={1.5} />} label="Adresses" to="/addresses" />
            </li>
            <li>
              <NavRow icon={<CreditCard size={18} strokeWidth={1.5} />} label="Moyens de paiement" to="/payment-methods" />
            </li>
            <li>
              <NavRow icon={<Heart size={18} strokeWidth={1.5} />} label="Favoris" to="/favorites" />
            </li>
            <li>
              <NavRow icon={<Ticket size={18} strokeWidth={1.5} />} label="Coupons" to="/coupons" />
            </li>
            <li>
              <NavRow icon={<Star size={18} strokeWidth={1.5} />} label="Mes avis" to="/reviews" />
            </li>
            <li>
              <NavRow icon={<Undo2 size={18} strokeWidth={1.5} />} label="Retours et remboursements" to="/returns" />
            </li>
          </NavRowList>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Mes commandes">
        <SectionHeader title="Mes commandes" />
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<ClipboardList size={18} strokeWidth={1.5} />} label="Toutes mes commandes" value={String(orders.length)} to="/orders" />
            </li>
          </NavRowList>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Support et aide">
        <SectionHeader title="Support & Aide" />
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<HelpCircle size={18} strokeWidth={1.5} />} label="Centre d'aide" to="/help" />
            </li>
            <li>
              <NavRow icon={<Mail size={18} strokeWidth={1.5} />} label="Contactez-nous" to="/contact" />
            </li>
            <li>
              <NavRow icon={<Info size={18} strokeWidth={1.5} />} label="À propos de M&amp;C Connect" to="/about" />
            </li>
          </NavRowList>
        </Card>
      </Section>

      <Section variant="flat" spacing="sm" ariaLabel="Déconnexion">
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<LogOut size={18} strokeWidth={1.5} />} label="Se déconnecter" onClick={logout} danger />
            </li>
          </NavRowList>
        </Card>
      </Section>
    </div>
  );
}
