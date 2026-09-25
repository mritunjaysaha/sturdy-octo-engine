import { Message } from '../types/chat';

const NOW = Date.now();
const ONE_MINUTE = 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;

export const initialMockConversation: Message[] = [
  {
    id: 'yesterday_system',
    type: 'system',
    text: 'Session ended.',
    timestamp: NOW - ONE_DAY - 30 * ONE_MINUTE,
  },
  {
    id: 'yesterday_user',
    type: 'user',
    text: 'Any offers available right now?',
    timestamp: NOW - ONE_DAY - 25 * ONE_MINUTE,
    status: 'sent',
  },
  {
    id: 'yesterday_ai',
    type: 'ai',
    text: 'Here are a few options for you.',
    timestamp: NOW - ONE_DAY - 24 * ONE_MINUTE,
    recommendations: [
      {
        id: 'rec_promo_1',
        type: 'promotion',
        title: 'Special Offer',
        subtitle: 'Get 50% off',
      },
      {
        id: 'rec_future_1',
        type: 'panchang',
        title: 'Daily Panchang',
        subtitle: 'View today details',
      },
    ],
  },

  {
    id: '1',
    type: 'system',
    text: 'Your session with AI Astrologer has started.',
    timestamp: NOW - 10 * ONE_MINUTE,
  },
  {
    id: '2',
    type: 'user',
    text: 'Can you tell me about my career this year?',
    timestamp: NOW - 8 * ONE_MINUTE,
    status: 'sent',
  },
  {
    id: '2_consecutive',
    type: 'user',
    text: 'Also what about my health?',
    timestamp: NOW - 7 * ONE_MINUTE,
    status: 'sent',
  },
  {
    id: '3',
    type: 'ai',
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    timestamp: NOW - 5 * ONE_MINUTE,
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
    id: '3_plain_ai',
    type: 'ai',
    text: 'Health looks good this month. No major issues seen.',
    timestamp: NOW - 4 * ONE_MINUTE,
  },
  {
    id: '4',
    type: 'human',
    text: 'I also recommend focusing on your upcoming Jupiter transit.',
    timestamp: NOW - 2 * ONE_MINUTE,
    author: {
      name: 'Pt. Sharma',
      title: 'Vedic Astrologer',
    },
  },
  {
    id: '4_consecutive_human',
    type: 'human',
    text: 'Feel free to ask if you have more questions.',
    timestamp: NOW - 1 * ONE_MINUTE,
    author: {
      name: 'Pt. Sharma',
      title: 'Vedic Astrologer',
    },
  },
];
