import { PersonalInfoForm } from '@/components/composite/PersonalInfoForm';
import styles from './SettingsPersonalPage.module.css';

export default function SettingsPersonalPage() {
  return (
    <div className={styles.container}>
      <PersonalInfoForm redirectTo="/settings" />
    </div>
  );
}
