import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { SearchBar } from '@/components/composite/SearchBar';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { Button } from '@/components/primitives/Button';
import { IconButton } from '@/components/primitives/IconButton';
import styles from './SearchPage.module.css';

const RECENT = ['tissu wax', 'téléphone', 'réfrigérateur', 'moulin'];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<'all' | 'electronics' | 'textile' | 'home'>('all');

  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <SearchBar initialValue={query} onSubmit={setQuery} />
        <div className={styles.tools}>
          <IconButton
            icon={<Camera size={20} strokeWidth={1.5} />}
            aria-label="Recherche par image"
            onClick={() => navigate('/image-search')}
          />
        </div>
      </header>

      <ChipFilterGroup
        ariaLabel="Filtres rapides"
        value={cat}
        onChange={setCat}
        options={[
          { value: 'all', label: 'Tous' },
          { value: 'electronics', label: 'Électronique' },
          { value: 'textile', label: 'Textile' },
          { value: 'home', label: 'Maison' },
        ]}
      />

      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className={styles.subhead}>Recherches récentes</h2>
        <ul className={styles.recent}>
          {RECENT.map((r) => (
            <li key={r}>
              <button
                type="button"
                className={styles.recentBtn}
                onClick={() => navigate(`/search/results?q=${encodeURIComponent(r)}`)}
              >
                {r}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Button block size="large" onClick={() => navigate(`/search/results?q=${encodeURIComponent(query)}`)}>
        Lancer la recherche
      </Button>
    </div>
  );
}
