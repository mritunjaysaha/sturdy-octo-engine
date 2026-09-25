import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserMessage } from '../../../types/chat';

export const UserBubble: FC<{
  message: UserMessage;
  isConsecutive?: boolean;
}> = ({ message, isConsecutive }) => {
  return (
    <View style={[styles.container, isConsecutive && styles.consecutive]}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
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
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
});
