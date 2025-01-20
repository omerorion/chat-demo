export enum ChatMessageType {
  USER_INPUT = "user_input",
  CHAT_RESPONSE = "chat_response"
}

export interface ChatMessage {
  text: string;
  type: ChatMessageType;
  uuid: string
}
