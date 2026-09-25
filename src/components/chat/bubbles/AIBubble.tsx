import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AIMessage } from '../../../types/chat';
import { RecommendationList } from '../../recommendations/RecommendationList';

export const AIBubble: FC<{
  message: AIMessage;
  isConsecutive?: boolean;
}> = ({ message, isConsecutive }) => {
  return (
    <View style={[styles.container, isConsecutive && styles.consecutive]}>
      <View style={styles.bubble}>
        {!isConsecutive && <Text style={styles.sender}>AI Astrologer</Text>}
        <Text style={styles.text}>{message.text}</Text>

        {message.recommendations && message.recommendations.length > 0 && (
          <RecommendationList items={message.recommendations} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    maxWidth: '92%',
    marginTop: 6,
  },
  consecutive: {
    marginTop: 2,
  },
  bubble: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sender: {
    color: '#4F46E5',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    color: '#1F2937',
    fontSize: 15,
    lineHeight: 21,
  },
});
