import { recommendationRegistry } from './recommendationRegistry';
import { GemstoneCard } from '../components/recommendations/cards/GemStoneCard';
import { TarotCard } from '../components/recommendations/cards/TarotCard';
import { ConsultationCard } from '../components/recommendations/cards/ConsultationCard';
import { ArticleCard } from '../components/recommendations/cards/ArticleCard';
import { PromotionCard } from '../components/recommendations/cards/PromotionCard';
import { DefaultFallbackCard } from '../components/recommendations/cards/DefaultFallbackCard';

export function bootstrapRecommendationRegistry() {
  recommendationRegistry.register('gemstone', GemstoneCard);
  recommendationRegistry.register('tarot', TarotCard);
  recommendationRegistry.register('consultation', ConsultationCard);
  recommendationRegistry.register('article', ArticleCard);
  recommendationRegistry.register('promotion', PromotionCard);
  recommendationRegistry.registerFallback(DefaultFallbackCard);
}

bootstrapRecommendationRegistry();
