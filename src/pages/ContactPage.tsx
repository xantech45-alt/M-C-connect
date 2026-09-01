import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/primitives/Button';
import { Input } from '@/components/primitives/Input';
import { useToast } from '@/components/ui/Toast';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const toast = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 300));
    setSending(false);
    toast('success', 'Message envoyé - notre équipe vous répond sous 24h.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        Une question sur une commande, un devis ou votre compte ? Écrivez-nous, notre équipe
        M&amp;C Connect vous répond en français.
      </p>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input label="Nom complet" id="contact-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="E-mail" id="contact-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Sujet" id="contact-subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <div className={styles.textareaWrap}>
          <label htmlFor="contact-message" className={styles.textareaLabel}>
            Message
          </label>
          <textarea
            id="contact-message"
            className={styles.textarea}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="primary" size="large" block disabled={sending}>
          {sending ? 'Envoi…' : 'Envoyer le message'}
        </Button>
      </form>
    </div>
  );
}
