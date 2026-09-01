import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ShieldCheck } from 'lucide-react';
import { EmptyState } from '@/components/primitives/EmptyState';
import { Section } from '@/components/primitives/Section';
import { getConversationById, type ThreadMessage } from '@/state/messages';
import styles from './MessageThreadPage.module.css';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function MessageThreadPage() {
  const { id } = useParams<{ id: string }>();
  const conversation = id ? getConversationById(id) : undefined;
  const [extra, setExtra] = useState<ThreadMessage[]>([]);
  const [draft, setDraft] = useState('');

  const allMessages = useMemo(
    () => [...(conversation?.messages ?? []), ...extra],
    [conversation, extra],
  );

  if (!conversation) {
    return (
      <div className={styles.container}>
        <EmptyState title="Conversation introuvable" body="Cette conversation n'existe plus ou a été déplacée." />
      </div>
    );
  }

  const onSend = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setExtra((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, from: 'user', body: trimmed, sentAt: new Date().toISOString() },
    ]);
    setDraft('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subjectHeading}>{conversation.subject}</h2>

      <Section variant="surface" spacing="sm" ariaLabel="Cadre M&C">
        <div className={styles.banner}>
          <span className={styles.bannerIcon} aria-hidden="true">
            <ShieldCheck size={16} strokeWidth={1.5} />
          </span>
          <p className={styles.bannerText}>
            Toute la communication passe par <strong>M&amp;C Connect</strong>. Vous ne traitez
            jamais directement avec un fournisseur chinois.
          </p>
        </div>
      </Section>

      <ul className={styles.thread}>
        {allMessages.map((m) => (
          <li key={m.id} className={m.from === 'user' ? styles.fromUser : styles.fromMc}>
            <div className={styles.bubble}>
              <p className={styles.body}>{m.body}</p>
            </div>
            <span className={styles.time}>{formatTime(m.sentAt)}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={onSend} className={styles.composer}>
        <label htmlFor="thread-draft" className={styles.srOnly}>
          Votre message
        </label>
        <input
          id="thread-draft"
          type="text"
          className={styles.input}
          placeholder="Écrire un message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className={styles.sendBtn} aria-label="Envoyer" disabled={!draft.trim()}>
          <Send size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
