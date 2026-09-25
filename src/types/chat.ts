export type MessageType = 'user' | 'ai' | 'human' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'failed';
export type RecommendationType =
  | 'gemstone'
  | 'tarot'
  | 'consultation'
  | 'article'
  | 'promotion'
  | string;

export interface BaseRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  subtitle?: string;
  metadata?: Record<string, unknown>;
}
export interface ReplyContext {
  id: string;
  text: string;
  sender: string;
}
export type DislikeReason =
  | 'Inaccurate'
  | 'Too Generic'
  | "Didn't Help"
  | 'Too Long';
export interface AIFeedbackState {
  rating: 'like' | 'dislike' | null;
  selectedReason?: DislikeReason | null;
}
export interface BaseMessage {
  id: string;
  type: MessageType;
  text: string;
  timestamp: number;
  replyTo?: ReplyContext;
}
export interface UserMessage extends BaseMessage {
  type: 'user';
  status: MessageStatus;
}
export interface SystemMessage extends BaseMessage {
  type: 'system';
}
export interface HumanMessage extends BaseMessage {
  type: 'human';
  author: {
    name: string;
    title: string;
  };
}
export interface AIMessage extends BaseMessage {
  type: 'ai';
  recommendations?: BaseRecommendation[];
  feedback?: AIFeedbackState;
}
export type Message = UserMessage | SystemMessage | HumanMessage | AIMessage;
