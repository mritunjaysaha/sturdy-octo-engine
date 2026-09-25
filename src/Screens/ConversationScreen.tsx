import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatStore } from '../store/chatStore';
import { UserBubble } from '../components/chat/bubbles/UserBubble';
import { AIBubble } from '../components/chat/bubbles/AIBubble';
import { HumanBubble } from '../components/chat/bubbles/HumanBubble';
import { SystemBanner } from '../components/chat/bubbles/SystemBanner';
import { DateSeparator } from '../components/chat/bubbles/DateSeparator';
import { Message } from '../types/chat';
import { bootstrapRecommendationRegistry } from '../registry/bootstrapRegistry';

export const ConversationScreen = () => {
  const messages = useChatStore(s => s.messages);
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    bootstrapRecommendationRegistry();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages.length]);

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MyNaksh AI Astrologer</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        style={styles.timeline}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const prev = index > 0 ? messages[index - 1] : null;
          const isConsecutive = prev !== null && prev.type === item.type;
          const showDateSeparator =
            index === 0 ||
            new Date(item.timestamp).toDateString() !==
              new Date(messages[index - 1].timestamp).toDateString();

          return (
            <View style={styles.itemWrapper}>
              {showDateSeparator && (
                <DateSeparator timestamp={item.timestamp} />
              )}
              {item.type === 'user' && (
                <UserBubble message={item} isConsecutive={isConsecutive} />
              )}
              {item.type === 'ai' && (
                <AIBubble message={item} isConsecutive={isConsecutive} />
              )}
              {item.type === 'human' && (
                <HumanBubble message={item} isConsecutive={isConsecutive} />
              )}
              {item.type === 'system' && <SystemBanner message={item} />}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  timeline: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  itemWrapper: {
    width: '100%',
  },
});
