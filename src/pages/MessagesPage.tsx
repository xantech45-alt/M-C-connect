import { Link } from 'react-router-dom';
import { ChevronRight, MessagesSquare, ShieldCheck } from 'lucide-react';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Chip } from '@/components/primitives/Chip';
import { Section } from '@/components/primitives/Section';
import { conversations } from '@/state/messages';
import styles from './MessagesPage.module.css';

export default function MessagesPage() {
  if (conversations.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="Aucun message"
          body="Toute la communication passe par M&C Connect - vous n'avez jamais à traiter directement avec un fournisseur."
          icon={<MessagesSquare size={56} strokeWidth={1.5} />}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Section variant="surface" spacing="sm" ariaLabel="Cadre M&C">
        <div className={styles.banner}>
          <span className={styles.bannerIcon} aria-hidden="true">
            <ShieldCheck size={18} strokeWidth={1.5} />
          </span>
          <p className={styles.bannerText}>
            Toute la communication passe par <strong>M&amp;C Connect</strong>. Vous ne traitez
            jamais directement avec un fournisseur chinois.
          </p>
        </div>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Conversations">
        <ul className={styles.list}>
          {conversations.map((c) => (
            <li key={c.id}>
              <Link to={`/messages/${c.id}`} className={styles.item}>
                <div className={styles.avatar} aria-hidden="true">
                  <MessagesSquare size={20} strokeWidth={1.5} />
                </div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <h2 className={styles.subject}>{c.subject}</h2>
                    <span className={styles.date}>
                      {new Date(c.lastMessageAt).toLocaleString('fr-FR', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </div>
                  <p className={styles.preview}>{c.preview}</p>
                  <div className={styles.meta}>
                    {c.orderId && (
                      <Chip tone="neutral" size="sm">
                        {c.orderId}
                      </Chip>
                    )}
                    {c.unread > 0 && (
                      <Chip tone="danger" size="sm">
                        {c.unread} nouveau{c.unread > 1 ? 'x' : ''}
                      </Chip>
                    )}
                    <span className={styles.tag}>M&amp;C Support</span>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  strokeWidth={1.5}
                  className={styles.chevron}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}