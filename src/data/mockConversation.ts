import { Message } from '../types/chat';

export const initialMockConversation: Message[] = [
  {
    id: '1',
    type: 'system',
    text: 'Your session with AI Astrologer has started.',
    timestamp: Date.now() - 1000 * 60 * 5,
  },
  {
    id: '2',
    type: 'user',
    text: 'Can you tell me about my career this year?',
    timestamp: Date.now() - 1000 * 60 * 4,
    status: 'sent',
  },
  {
    id: '3',
    type: 'ai',
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    timestamp: Date.now() - 1000 * 60 * 3,
    recommendations: [
      {
        id: '1',
        type: 'gemstone',
        title: 'Blue Sapphire',
        subtitle: 'Recommended for Saturn',
      },
      {
        id: '2',
        type: 'tarot',
        title: 'Career Tarot Reading',
      },
      {
        id: '3',
        type: 'consultation',
        title: 'Talk to an Astrologer',
      },
      {
        id: '4',
        type: 'article',
        title: 'Understanding Saturn Mahadasha',
      },
    ],
  },
  {
    id: '4',
    type: 'human',
    text: 'I also recommend focusing on your upcoming Jupiter transit.',
    timestamp: Date.now() - 1000 * 60 * 2,
    author: {
      name: 'Pt. Sharma',
      title: 'Vedic Astrologer',
    },
  },
];
