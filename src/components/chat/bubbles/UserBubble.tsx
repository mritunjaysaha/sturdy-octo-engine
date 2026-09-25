import React, { FC } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { UserMessage } from '../../../types/chat';
import { useChatStore } from '../../../store/chatStore';

export const UserBubble: FC<{
  message: UserMessage;
  isConsecutive?: boolean;
}> = ({ message, isConsecutive }) => {
  const retryMessage = useChatStore(s => s.retryMessage);

  return (
    <View style={[styles.container, isConsecutive && styles.consecutive]}>
      <View
        style={[
          styles.bubble,
          message.status === 'failed' && styles.bubbleFailed,
        ]}
      >
        <Text style={styles.text}>{message.text}</Text>
      </View>

      <View style={styles.statusRow}>
        {message.status === 'sending' && (
          <Text style={styles.statusSending}>Sending...</Text>
        )}
        {message.status === 'sent' && (
          <Text style={styles.statusSent}>Sent</Text>
        )}
        {message.status === 'failed' && (
          <View style={styles.failedRow}>
            <Text style={styles.statusFailed}>Failed</Text>
            <Pressable
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={[styles.retryButton]}
              onPress={() => retryMessage(message.id)}
            >
              <Text style={styles.retryText}>Retry</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    maxWidth: '82%',
    marginTop: 6,
  },
  consecutive: {
    marginTop: 2,
  },
  bubble: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 16,
    borderBottomRightRadius: 3,
  },
  bubbleFailed: {
    backgroundColor: '#6B7280',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 4,
  },
  statusSending: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
  },
  statusSent: {
    color: '#9CA3AF',
    fontSize: 10,
  },
  failedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusFailed: {
    color: '#DC2626',
    fontSize: 10,
    fontWeight: '600',
    marginRight: 4,
  },
  retryButton: {
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  retryText: {
    color: '#007AFF',
    fontSize: 10,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
