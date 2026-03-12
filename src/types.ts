// En lugar de 'enum', usamos 'const' + 'as const' para cumplir con la regla erasableSyntaxOnly
export const Sender = {
  USER: 'user',
  MODEL: 'model'
} as const;

// Esto crea un tipo que es igual a 'user' | 'model'
export type Sender = typeof Sender[keyof typeof Sender];

export interface ChatMessage {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface SocialMedia {
  id: string;
  name: string;
  handle: string;
  url: string;
}