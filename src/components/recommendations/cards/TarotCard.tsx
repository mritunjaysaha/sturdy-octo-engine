import React, { FC } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { BaseRecommendation } from '../../../types/chat';

export const TarotCard: FC<{
  item: BaseRecommendation;
  onPress: () => void;
}> = ({ item, onPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.card,
      styles.border,
      pressed && styles.pressed,
    ]}
    onPress={onPress}
  >
    <View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>TAROT</Text>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
    <Text style={styles.subtitle} numberOfLines={1}>
      {item.subtitle || 'Career Reading'}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 96,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginRight: 8,
    justifyContent: 'space-between',
  },
  border: { borderColor: '#DDD6FE', borderWidth: 1 },
  pressed: { opacity: 0.8 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: { color: '#6D28D9', fontSize: 9, fontWeight: '700' },
  title: { color: '#111827', fontSize: 13, fontWeight: '600' },
  subtitle: { color: '#6B7280', fontSize: 11 },
});
