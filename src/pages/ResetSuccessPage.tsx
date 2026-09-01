import { useNavigate } from 'react-router-dom';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { EmptyState } from '@/components/primitives/EmptyState';
import { useT } from '@/state/LocaleProvider';
import styles from './ResetSuccessPage.module.css';

export default function ResetSuccessPage() {
  const t = useT();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <EmptyState
        icon={<CircleCheck size={56} strokeWidth={1.5} className={styles.successIcon} aria-hidden="true" />}
        title={t('auth.resetSuccessTitle')}
        body={t('auth.resetSuccessBody')}
        action={
          <div className={styles.actions}>
            <Button variant="primary" size="large" block onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
            <Button variant="tertiary" size="large" block onClick={() => navigate('/home')}>
              {t('auth.backToHome')}
            </Button>
          </div>
        }
      />
    </div>
  );
}
