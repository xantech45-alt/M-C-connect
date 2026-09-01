import type { ReactNode } from 'react';
import { Package } from 'lucide-react';
import styles from './Image.module.css';

interface Props {
  /** Resolved URL from the asset registry (or a runtime blob URL). Omit to render the fallback. */
  src?: string;
  /** Meaningful alt text. Pass '' only when adjacent text already names the subject. */
  alt: string;
  width: number;
  height: number;
  /** CSS aspect-ratio value, e.g. "1/1", "4/3", "16/9". Defaults to width/height. */
  ratio?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'auto';
  /** Icon shown in place of a missing image (unphotographed categories). */
  fallbackIcon?: ReactNode;
  className?: string;
}

export function Image({
  src,
  alt,
  width,
  height,
  ratio,
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackIcon,
  className,
}: Props) {
  const style = { aspectRatio: ratio ?? `${width}/${height}` };

  if (!src) {
    return (
      <div className={[styles.frame, styles.fallback, className].filter(Boolean).join(' ')} style={style}>
        {fallbackIcon ?? <Package size={Math.round(Math.min(width, height) * 0.4)} strokeWidth={1.5} aria-hidden="true" />}
      </div>
    );
  }

  // React 18.3's DOM attribute allowlist doesn't yet map the `fetchPriority` prop, so it warns
  // and drops it; passing the lowercase HTML attribute name directly avoids both.
  const fetchPriorityAttr: Record<string, string> =
    loading === 'eager' ? { fetchpriority: fetchPriority } : {};

  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={style}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={loading}
        {...fetchPriorityAttr}
        className={styles.img}
      />
    </div>
  );
}
