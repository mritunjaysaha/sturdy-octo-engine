import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useChatStore } from '../../store/chatStore';

export const MessageComposer = () => {
  const [text, setText] = useState('');
  const sendMessage = useChatStore(s => s.sendMessage);

  const canSend = text.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    sendMessage(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask a question..."
          placeholderTextColor="#9CA3AF"
          value={text}
          onChangeText={setText}
          multiline
        />
        <Pressable
          style={[styles.sendButton, canSend && styles.sendButtonActive]}
          onPress={handleSend}
          disabled={!canSend}
        >
          <Text
            style={[
              styles.sendButtonText,
              canSend && styles.sendButtonTextActive,
            ]}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    minHeight: 40,
  },
  input: {
    flex: 1,
    color: '#111827',
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
  sendButtonActive: {
    backgroundColor: '#007AFF',
  },
  sendButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  sendButtonTextActive: {
    color: '#FFFFFF',
  },
});
