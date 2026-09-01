import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import styles from './ImageSearchPage.module.css';

export default function ImageSearchPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Photographiez ou téléversez un produit - M&amp;C Connect trouve le fournisseur vérifié.
      </p>
      <label className={styles.dropzone} htmlFor="img-input">
        {preview ? (
          <img
            src={preview}
            alt="Aperçu"
            width={640}
            height={640}
            decoding="async"
            loading="eager"
            className={styles.preview}
          />
        ) : (
          <div className={styles.placeholder}>
            <Camera size={48} strokeWidth={1.5} aria-hidden="true" />
            <span>Prendre ou choisir une photo</span>
          </div>
        )}
        <input
          id="img-input"
          type="file"
          accept="image/*"
          capture="environment"
          className={styles.fileInput}
          onChange={onFile}
        />
      </label>
      <div className={styles.actions}>
        <Button
          variant="primary"
          block
          size="large"
          leadingIcon={<Upload size={18} strokeWidth={1.5} />}
          disabled={!preview}
          onClick={() => navigate('/search/results?q=image-search')}
        >
          Rechercher
        </Button>
      </div>
    </div>
  );
}
