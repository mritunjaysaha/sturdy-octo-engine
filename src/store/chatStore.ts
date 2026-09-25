import { create } from 'zustand';
import { Message, UserMessage, AIMessage } from '../types/chat';
import { initialMockConversation } from '../data/mockConversation';

interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  loadConversation: (forceError?: boolean, forceEmpty?: boolean) => void;
  sendMessage: (text: string) => void;
  retryMessage: (messageId: string) => void;
}

export const useChatStore = create<ChatStore>(set => ({
  messages: [],
  isLoading: true,
  error: null,

  loadConversation: (forceError = false, forceEmpty = false) => {
    set({ isLoading: true, error: null });
    setTimeout(() => {
      if (forceError) {
        set({
          isLoading: false,
          error: 'Unable to load conversation.',
        });
        return;
      }
      set({
        messages: forceEmpty ? [] : initialMockConversation,
        isLoading: false,
        error: null,
      });
    }, 600);
  },

  sendMessage: (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: UserMessage = {
      id: userMessageId,
      type: 'user',
      text: trimmed,
      timestamp: Date.now(),
      status: 'sending',
    };

    set(state => ({
      messages: [...state.messages, userMessage],
    }));

    const isSimulatedFailure = trimmed.toLowerCase().includes('fail');

    // Simulate API delay
    setTimeout(() => {
      if (isSimulatedFailure) {
        set(state => ({
          messages: state.messages.map(m =>
            m.id === userMessageId && m.type === 'user'
              ? { ...m, status: 'failed' as const }
              : m,
          ),
        }));
        return;
      }

      set(state => ({
        messages: state.messages.map(m =>
          m.id === userMessageId && m.type === 'user'
            ? { ...m, status: 'sent' as const }
            : m,
        ),
      }));

      setTimeout(() => {
        const aiMessage: AIMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          text: `Analyzing for ${trimmed}`,
          timestamp: Date.now(),
          recommendations: [
            {
              id: `rec-${Date.now()}-1`,
              type: 'gemstone',
              title: 'Blue Sapphire',
              subtitle: 'Strengthen Saturn',
            },
            {
              id: `rec-${Date.now()}-2`,
              type: 'consultation',
              title: 'Talk to Astrologer',
              subtitle: '15 min live consultation',
            },
          ],
        };

        set(state => ({
          messages: [...state.messages, aiMessage],
        }));
      }, 700);
    }, 1100);
  },

  retryMessage: (messageId: string) => {
    set(state => ({
      messages: state.messages.map(m =>
        m.id === messageId && m.type === 'user'
          ? { ...m, status: 'sending' as const }
          : m,
      ),
    }));

    // Simulate successful retry after delay
    setTimeout(() => {
      set(state => ({
        messages: state.messages.map(m =>
          m.id === messageId && m.type === 'user'
            ? { ...m, status: 'sent' as const }
            : m,
        ),
      }));

      setTimeout(() => {
        const aiMessage: AIMessage = {
          id: `ai-${Date.now()}`,
          type: 'ai',
          text: 'Connection re-established. Your chart has been updated.',
          timestamp: Date.now(),
        };

        set(state => ({
          messages: [...state.messages, aiMessage],
        }));
      }, 700);
    }, 1100);
  },
}));
