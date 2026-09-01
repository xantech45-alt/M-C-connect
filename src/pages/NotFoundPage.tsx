import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Page introuvable</p>
      <Link to="/home">Retour à l&apos;accueil</Link>
    </div>
  );
}
