import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, CreditCard } from 'lucide-react';
import { Brand } from '@/components/primitives/Brand';
import { brandAsset } from '@/assets/registry';
import { useT } from '@/state/LocaleProvider';
import styles from './OnboardingPage.module.css';

const SLIDE_COUNT = 5;
const SWIPE_THRESHOLD_PX = 50;

function SecuritySlideArt() {
  return (
    <div className={styles.iconCluster} aria-hidden="true">
      <span className={`${styles.iconBubble} ${styles.iconBubbleLock}`}>
        <Lock size={22} strokeWidth={1.5} />
      </span>
      <span className={`${styles.iconBubble} ${styles.iconBubbleUser}`}>
        <User size={22} strokeWidth={1.5} />
      </span>
      <span className={styles.iconClusterCenter}>
        <ShieldCheck size={44} strokeWidth={1.5} />
      </span>
      <span className={`${styles.iconBubble} ${styles.iconBubbleCard}`}>
        <CreditCard size={22} strokeWidth={1.5} />
      </span>
    </div>
  );
}

export default function OnboardingPage() {
  const t = useT();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const slides = [
    { key: 'slide1', asset: 'onboarding-1' as const },
    { key: 'slide2', asset: 'onboarding-2' as const },
    { key: 'slide3', asset: 'onboarding-3' as const },
    { key: 'slide4', asset: 'onboarding-4' as const },
    { key: 'slide5', asset: null },
  ];

  const isLast = index === SLIDE_COUNT - 1;

  const goTo = (next: number) => setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));

  const onPrimary = () => {
    if (isLast) {
      navigate('/login');
    } else {
      goTo(index + 1);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [index]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const delta = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (delta <= -SWIPE_THRESHOLD_PX) goTo(index + 1);
    else if (delta >= SWIPE_THRESHOLD_PX) goTo(index - 1);
  };

  const slide = slides[index];

  return (
    <div
      className={styles.container}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      role="group"
      aria-roledescription="carousel"
      aria-label="Présentation M&amp;C Connect"
    >
      <div className={styles.logoLockup}>
        <Brand variant="full" />
      </div>

      <div className={styles.art}>
        {slide.asset ? (
          <img
            src={brandAsset(slide.asset)}
            alt=""
            width={280}
            height={280}
            decoding="async"
            loading={index === 0 ? 'eager' : 'lazy'}
            className={styles.artImage}
          />
        ) : (
          <SecuritySlideArt />
        )}
      </div>

      <h1 className={styles.title} aria-live="polite">
        {t(`onboarding.${slide.key}.title`)}
      </h1>
      <p className={styles.body}>{t(`onboarding.${slide.key}.body`)}</p>

      <div className={styles.dots} role="tablist" aria-label="Diapositives d'introduction">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Diapositive ${i + 1} sur ${SLIDE_COUNT}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryCta} onClick={onPrimary}>
          {isLast ? t('onboarding.start') : t('onboarding.next')}
        </button>
        <button type="button" className={styles.skipLink} onClick={() => navigate('/login')}>
          {t('onboarding.skip')}
        </button>
      </div>
    </div>
  );
}
