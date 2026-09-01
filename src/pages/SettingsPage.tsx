import {
  User,
  ShieldCheck,
  CreditCard,
  MapPin,
  SlidersHorizontal,
  Bell,
  Globe,
  Coins,
  HelpCircle,
  Info,
  LogOut,
} from 'lucide-react';
import { Card } from '@/components/primitives/Card';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { NavRow, NavRowList } from '@/components/composite/NavRow';
import { useAuth } from '@/state/AuthProvider';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const { logout } = useAuth();

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="md" ariaLabel="Compte">
        <SectionHeader title="Compte" />
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<User size={18} strokeWidth={1.5} />} label="Informations personnelles" to="/settings/personal" />
            </li>
            <li>
              <NavRow icon={<ShieldCheck size={18} strokeWidth={1.5} />} label="Sécurité" to="/settings/security" />
            </li>
            <li>
              <NavRow icon={<CreditCard size={18} strokeWidth={1.5} />} label="Moyens de paiement" to="/payment-methods" />
            </li>
            <li>
              <NavRow icon={<MapPin size={18} strokeWidth={1.5} />} label="Adresses" to="/addresses" />
            </li>
            <li>
              <NavRow icon={<SlidersHorizontal size={18} strokeWidth={1.5} />} label="Préférences" />
            </li>
            <li>
              <NavRow icon={<Bell size={18} strokeWidth={1.5} />} label="Notifications" />
            </li>
            <li>
              <NavRow icon={<Globe size={18} strokeWidth={1.5} />} label="Langue" value="Français" />
            </li>
            <li>
              <NavRow icon={<Coins size={18} strokeWidth={1.5} />} label="Devise" value="XOF" />
            </li>
          </NavRowList>
        </Card>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Autres">
        <SectionHeader title="Autres" />
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<HelpCircle size={18} strokeWidth={1.5} />} label="Aide et support" to="/help" />
            </li>
            <li>
              <NavRow icon={<Info size={18} strokeWidth={1.5} />} label="À propos" to="/about" />
            </li>
          </NavRowList>
        </Card>
      </Section>

      <Section variant="flat" spacing="sm" ariaLabel="Déconnexion">
        <Card>
          <NavRowList>
            <li>
              <NavRow icon={<LogOut size={18} strokeWidth={1.5} />} label="Déconnexion" onClick={logout} danger />
            </li>
          </NavRowList>
        </Card>
      </Section>
    </div>
  );
}
