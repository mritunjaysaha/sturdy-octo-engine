import { create } from 'zustand';
import { Message } from '../types/chat';
import { initialMockConversation } from '../data/mockConversation';

interface ChatStore {
  messages: Message[];
}

export const useChatStore = create<ChatStore>(() => ({
  messages: initialMockConversation,
}));
