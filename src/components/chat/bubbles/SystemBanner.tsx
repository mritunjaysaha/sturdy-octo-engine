import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SystemMessage } from '../../../types/chat';

export const SystemBanner: FC<{ message: SystemMessage }> = ({ message }) => (
  <View style={styles.container}>
    <View style={styles.banner}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 8 },
  banner: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  text: { color: '#6B7280', fontSize: 11, fontWeight: '500' },
});
