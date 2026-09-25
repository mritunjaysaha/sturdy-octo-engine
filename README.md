# MyNaksh AI Astrologer

AI conversation interface and Server-Driven UI (SDUI) recommendation framework for astrology consultations.

## Setup & Running

```bash
npm install
npm run android
```

To run checks:
```bash
npm run lint
npx tsc --noEmit
```

## Project Structure

The codebase decouples domain types (`src/types`), mock data (`src/data`), state management (`src/store`), and Server-Driven UI registry bindings (`src/registry`) from the presentation layer. The UI is split into screen containers (`src/Screens`), polymorphic chat bubbles (`src/components/chat`), and modular recommendation card renderers (`src/components/recommendations`).

```text
MyNakshAssignment/
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
├── __tests__/
│   └── App.test.tsx
└── src/
    ├── types/
    │   └── chat.ts
    ├── data/
    │   └── mockConversation.ts
    ├── registry/
    │   ├── recommendationRegistry.ts
    │   └── bootstrapRegistry.ts
    ├── store/
    │   └── chatStore.ts
    ├── Screens/
    │   └── ConversationScreen.tsx
    └── components/
        ├── chat/
        │   ├── MessageComposer.tsx
        │   └── bubbles/
        │       ├── UserBubble.tsx
        │       ├── AIBubble.tsx
        │       ├── HumanBubble.tsx
        │       ├── SystemBanner.tsx
        │       └── DateSeparator.tsx
        └── recommendations/
            ├── RecommendationList.tsx
            └── cards/
                ├── GemStoneCard.tsx
                ├── TarotCard.tsx
                ├── ConsultationCard.tsx
                ├── ArticleCard.tsx
                ├── PromotionCard.tsx
                └── DefaultFallbackCard.tsx
```

## Component Architecture

- **Polymorphic Timeline:** FlatList dispatches to dedicated bubble components (`UserBubble`, `AIBubble`, `HumanBubble`, `SystemBanner`) based on message type instead of a large conditional component.
- **Message Grouping:** Consecutive messages from the same sender collapse author headers and spacing to increase message density.
- **Date Separators:** Rendered inline when a message's timestamp crosses into a new calendar day.
- **Touch Ergonomics:** Interactive cards and buttons use `Pressable` with `hitSlop` bounds to avoid missed taps.

## State Management

Centralized with Zustand in `src/store/chatStore.ts`:
- **Optimistic Sends:** Appends the message immediately with `sending` status, clears the input, and updates to `sent` after an ~1100ms API delay while appending a simulated AI response.
- **Error & Retry:** Messages containing `"fail"` transition to `failed` status, showing an inline retry trigger that re-executes the send pipeline.
- **Lifecycle Handling:**
  - Initial load shows a spinner with `"Loading conversation..."` (600ms simulated fetch).
  - Empty array shows `ListEmptyComponent` with `"Start your conversation."` while keeping the composer active.
  - Failure displays `"Unable to load conversation."` with a retry button to re-trigger fetch.

## Recommendation Rendering Strategy

Implemented Server-Driven UI following the Open-Closed Principle (OCP):
- `RecommendationRegistry` (`src/registry/recommendationRegistry.ts`) maps card type strings (`gemstone`, `tarot`, `consultation`, `article`, `promotion`) to their component renderers.
- Adding a new card only requires registering it in `src/registry/bootstrapRegistry.ts`. Neither the AI bubble nor the timeline components need to be modified.
- Unrecognized or malformed schemas fall back to `DefaultFallbackCard` to avoid crashes.
- Cards animate into view with staggered entry using React Native Reanimated on the native thread.

## Performance Considerations

- Virtualized `FlatList` with unique `id` keys to keep memory low during long chat histories.
- Card entry animations run on the UI thread via Reanimated worklets without bridge overhead.
- Zustand selectors used to prevent unnecessary re-renders on typing.
- Explicit dimensions on recommendation cards to prevent layout shifts.

## Trade-offs (Features Skipped in Part B)

Given the 3-hour time constraint, I prioritized getting the core timeline, SDUI registry, optimistic sends, and error/lifecycle recovery solid. The following Part B features were cut:

1. **Conversation Actions (Long-Press):**
   - Action sheet / modal on long-pressing AI messages (`Copy`, `Delete`, `Reply`).
   - Quote reply preview banner above the composer.
2. **AI Feedback:**
   - Like / Dislike reaction buttons under AI messages.
   - Expandable feedback chips (`Inaccurate`, `Too Generic`, `Didn't Help`, `Too Long`) and local state tracking for them.
