import React, { FC } from 'react';
import { FlatList, Alert, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { BaseRecommendation } from '../../types/chat';
import { recommendationRegistry } from '../../registry/recommendationRegistry';
import '../../registry/bootstrapRegistry';

export const RecommendationList: FC<{ items: BaseRecommendation[] }> = ({
  items,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const CardComp = recommendationRegistry.getComponent(item.type);
          if (!CardComp) return null;

          return (
            <Animated.View
              entering={FadeInRight.delay(index * 60).duration(250)}
            >
              <CardComp
                item={item}
                onPress={() =>
                  Alert.alert(
                    item.title,
                    `${item.type.toUpperCase()}: ${
                      item.subtitle || 'Selected for details.'
                    }`,
                  )
                }
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 4,
    height: 104,
  },
  list: {
    flexGrow: 0,
    height: 104,
  },
  listContent: {
    paddingRight: 8,
    alignItems: 'center',
  },
});
