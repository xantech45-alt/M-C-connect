export interface ThreadMessage {
  id: string;
  from: 'user' | 'mc';
  body: string;
  sentAt: string;
}

export interface Conversation {
  id: string;
  subject: string;
  orderId?: string;
  unread: number;
  lastMessageAt: string;
  preview: string;
  messages: ThreadMessage[];
}

export const conversations: Conversation[] = [
  {
    id: 'c-1',
    subject: 'Commande MC-000123 - expédition',
    orderId: 'MC-000123',
    unread: 2,
    lastMessageAt: '2026-09-04T10:22:00Z',
    preview: 'Le conteneur a quitté Tianjin hier. ETA révisé au 22 septembre.',
    messages: [
      {
        id: 'c-1-m1',
        from: 'mc',
        body: 'Bonjour, votre commande MC-000123 a passé le contrôle qualité avec succès.',
        sentAt: '2026-08-30T09:12:00Z',
      },
      {
        id: 'c-1-m2',
        from: 'user',
        body: 'Merci, avez-vous une date de départ du conteneur ?',
        sentAt: '2026-08-30T14:03:00Z',
      },
      {
        id: 'c-1-m3',
        from: 'mc',
        body: 'Le conteneur a quitté Tianjin hier.',
        sentAt: '2026-09-04T10:15:00Z',
      },
      {
        id: 'c-1-m4',
        from: 'mc',
        body: 'ETA révisé au 22 septembre à Bamako, douane incluse.',
        sentAt: '2026-09-04T10:22:00Z',
      },
    ],
  },
  {
    id: 'c-2',
    subject: 'Demande de devis',
    unread: 0,
    lastMessageAt: '2026-08-31T14:05:00Z',
    preview: "Votre devis a été envoyé. N'hésitez pas si vous avez des questions.",
    messages: [
      {
        id: 'c-2-m1',
        from: 'user',
        body: 'Bonjour, je souhaiterais un devis pour 500 unités.',
        sentAt: '2026-08-31T09:00:00Z',
      },
      {
        id: 'c-2-m2',
        from: 'mc',
        body: "Votre devis a été envoyé. N'hésitez pas si vous avez des questions.",
        sentAt: '2026-08-31T14:05:00Z',
      },
    ],
  },
  {
    id: 'c-3',
    subject: 'Livraison MC-000125',
    orderId: 'MC-000125',
    unread: 0,
    lastMessageAt: '2026-08-10T09:00:00Z',
    preview: 'Livraison confirmée. Merci pour votre confiance.',
    messages: [
      {
        id: 'c-3-m1',
        from: 'mc',
        body: 'Votre commande MC-000125 est arrivée à Bamako et a été livrée ce matin.',
        sentAt: '2026-08-10T08:45:00Z',
      },
      {
        id: 'c-3-m2',
        from: 'mc',
        body: 'Livraison confirmée. Merci pour votre confiance.',
        sentAt: '2026-08-10T09:00:00Z',
      },
    ],
  },
];

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find((c) => c.id === id);
}
