import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatStore } from '../store/chatStore';
import { UserBubble } from '../components/chat/bubbles/UserBubble';
import { AIBubble } from '../components/chat/bubbles/AIBubble';
import { HumanBubble } from '../components/chat/bubbles/HumanBubble';
import { SystemBanner } from '../components/chat/bubbles/SystemBanner';
import { DateSeparator } from '../components/chat/bubbles/DateSeparator';
import { MessageComposer } from '../components/chat/MessageComposer';
import { Message } from '../types/chat';
import { bootstrapRecommendationRegistry } from '../registry/bootstrapRegistry';

export const ConversationScreen = () => {
  const { messages, isLoading, error, loadConversation } = useChatStore();
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    bootstrapRecommendationRegistry();
    loadConversation();
  }, [loadConversation]);

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

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Loading conversation...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Unable to load conversation.</Text>
          <Text style={styles.errorSubtitle}>
            Please check your connection and try again.
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => loadConversation()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={styles.body}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            style={styles.timeline}
            contentContainerStyle={[
              styles.listContent,
              messages.length === 0 && styles.listContentEmpty,
            ]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>Start your conversation.</Text>
              </View>
            }
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
          <MessageComposer />
        </KeyboardAvoidingView>
      )}
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
  body: {
    flex: 1,
  },
  timeline: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemWrapper: {
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    textAlign: 'center',
  },
});
