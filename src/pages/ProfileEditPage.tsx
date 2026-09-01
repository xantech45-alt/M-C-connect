import { PersonalInfoForm } from '@/components/composite/PersonalInfoForm';
import styles from './ProfileEditPage.module.css';

export default function ProfileEditPage() {
  return (
    <div className={styles.container}>
      <PersonalInfoForm redirectTo="/profile" />
    </div>
  );
}
