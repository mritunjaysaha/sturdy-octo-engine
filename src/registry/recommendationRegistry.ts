import { ComponentType } from 'react';
import { BaseRecommendation } from '../types/chat';

export type CardComponent = ComponentType<{
  item: BaseRecommendation;
  onPress: () => void;
}>;

class RecommendationRegistry {
  private registry = new Map<string, CardComponent>();
  private fallbackComponent: CardComponent | null = null;

  public register(type: string, component: CardComponent) {
    this.registry.set(type.toLowerCase(), component);
  }

  public registerFallback(component: CardComponent) {
    this.fallbackComponent = component;
  }

  public getComponent(type: string): CardComponent | null {
    return this.registry.get(type.toLowerCase()) || this.fallbackComponent;
  }
}

export const recommendationRegistry = new RecommendationRegistry();
