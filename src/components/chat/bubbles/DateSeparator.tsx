import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DateSeparator: FC<{ timestamp: number }> = ({ timestamp }) => {
  const date = new Date(timestamp);
  const today = new Date();
  let label = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (date.toDateString() === today.toDateString()) {
    label = 'Today';
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      label = 'Yesterday';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  text: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },
});
