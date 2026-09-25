import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HumanMessage } from '../../../types/chat';

export const HumanBubble: FC<{
  message: HumanMessage;
  isConsecutive?: boolean;
}> = ({ message, isConsecutive }) => (
  <View style={[styles.container, isConsecutive && styles.consecutive]}>
    <View style={styles.bubble}>
      {!isConsecutive && (
        <View style={styles.headerRow}>
          <Text style={styles.authorName}>{message.author.name}</Text>
          <Text style={styles.badge}>{message.author.title}</Text>
        </View>
      )}
      <Text style={styles.text}>{message.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    marginTop: 6,
  },
  consecutive: {
    marginTop: 2,
  },
  bubble: {
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 3,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 6,
  },
  badge: {
    color: '#78350F',
    fontSize: 10,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#FDE68A',
  },
  text: {
    color: '#1F2937',
    fontSize: 15,
    lineHeight: 20,
  },
});
