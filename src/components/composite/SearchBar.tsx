import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, X } from 'lucide-react';
import styles from './SearchBar.module.css';

export type SearchBarVariant = 'home' | 'compact' | 'results';

interface Suggestion {
  type: 'product' | 'category' | 'recent';
  label: string;
  q: string;
}

const SUGGESTIONS: Suggestion[] = [
  { type: 'product', label: 'Pompe solaire 1500W', q: 'pompe solaire 1500w' },
  { type: 'product', label: 'Pompe solaire immergée', q: 'pompe solaire immergée' },
  { type: 'category', label: 'Machines agricoles', q: 'machines agricoles' },
  { type: 'product', label: 'Générateur diesel 5kVA', q: 'générateur diesel 5kva' },
  { type: 'category', label: 'Équipement industriel', q: 'équipement industriel' },
];

const RECENTS = ['tissu wax', 'réfrigérateur', 'moulin à grain'];

interface Props {
  variant?: SearchBarVariant;
  initialValue?: string;
  placeholder?: string;
  onSubmit?: (q: string) => void;
  onCameraClick?: () => void;
}

export function SearchBar({
  variant = 'home',
  initialValue = '',
  placeholder = 'Rechercher produits, marques, catégories…',
  onSubmit,
  onCameraClick,
}: Props) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setFocused(false);
    if (onSubmit) onSubmit(trimmed);
    else navigate(`/search/results?q=${encodeURIComponent(trimmed)}`);
  };

  const filtered = value
    ? SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(value.toLowerCase()),
      )
    : [];

  return (
    <form
      role="search"
      className={`${styles.root} ${styles[variant]}`}
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
    >
      <span className={styles.icon} aria-hidden="true">
        <Search size={18} strokeWidth={1.5} />
      </span>
      <input
        ref={inputRef}
        type="search"
        inputMode="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        className={styles.input}
        aria-label="Rechercher"
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Effacer la recherche"
          onClick={() => {
            setValue('');
            inputRef.current?.focus();
          }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      )}
      <button
        type="button"
        className={styles.camera}
        aria-label="Recherche par image"
        onClick={() => (onCameraClick ? onCameraClick() : navigate('/image-search'))}
      >
        <Camera size={20} strokeWidth={1.5} />
      </button>

      {focused && (
        <div className={styles.panel} role="listbox">
          {filtered.length > 0 ? (
            <>
              <p className={styles.panelHeading}>Suggestions</p>
              <ul className={styles.suggestions}>
                {filtered.map((s) => (
                  <li key={s.q}>
                    <button
                      type="button"
                      className={styles.suggestion}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        submit(s.q);
                      }}
                    >
                      <Search size={14} strokeWidth={1.5} aria-hidden="true" />
                      <span>{s.label}</span>
                      <em className={styles.tag}>{s.type === 'category' ? 'Catégorie' : 'Produit'}</em>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className={styles.panelHeading}>Recherches récentes</p>
              <ul className={styles.recent}>
                {RECENTS.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      className={styles.recentBtn}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        submit(r);
                      }}
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </form>
  );
}
