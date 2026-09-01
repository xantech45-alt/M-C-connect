import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, A11y, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './HeroCarousel.module.css';

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  to: string;
}

interface Props {
  slides: HeroSlide[];
}

const AUTOPLAY_MS = 5000;

/**
 * Auto-playing hero banner carousel. Replaces the hand-rolled
 * useState + pointer-swipe hero with Swiper, providing:
 *  - 5 s autoplay (paused under prefers-reduced-motion)
 *  - Touch swipe, mousewheel omitted (vertical scroll is primary)
 *  - Clickable pagination dots (themed via :global in HomePage.module.css)
 *  - Keyboard navigation (←/→)
 *  - Screen-reader friendly: role=group, aria-roledescription=carousel,
 *    aria-live on title, descriptive slide labels
 */
export function HeroCarousel({ slides }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <div
      className={styles.hero}
      role="group"
      aria-roledescription="carousel"
      aria-label="Bannières promotionnelles"
    >
      <Swiper
        modules={[Autoplay, Pagination, A11y, Keyboard]}
        slidesPerView={1}
        loop
        speed={500}
        autoplay={
          reducedMotion
            ? false
            : { delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: false }
        }
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<button type="button" role="tab" aria-label="Bannière ${index + 1} sur ${slides.length}" class="${className}"></button>`,
        }}
        a11y={{
          slideRole: 'group',
          slideLabelMessage: 'Bannière {{index}} sur {{slidesLength}}',
        }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        watchSlidesProgress
        className={styles.swiper}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <img
              src={s.image}
              alt=""
              width={960}
              height={400}
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
              className={styles.image}
              {...({ fetchpriority: i === 0 ? 'high' : 'low' } as Record<string, string>)}
            />
            <div className={styles.scrim} aria-hidden="true" />
            <div className={styles.copy}>
              <span className={styles.eyebrow}>
                <Sparkles size={14} strokeWidth={1.5} aria-hidden="true" />
                Nouveau · Programme Sourcing
              </span>
              <h1 className={styles.title} aria-live="polite">{s.title}</h1>
              <p className={styles.subtitle}>{s.subtitle}</p>
              <Link to={s.to} className={styles.cta}>
                {s.cta}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
