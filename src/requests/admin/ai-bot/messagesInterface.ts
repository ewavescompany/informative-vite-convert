export interface messageInterface {
  senderId: number;
  message: string | string[] | any;
  type: string;
}

export interface ChatMessage {
  conv_bot: number; // Indicates if the message is from a bot (1) or not (0)
  conv_chat_uuid: string; // Unique identifier for the chat conversation
  conv_command: string; // The command associated with the message
  conv_content: string; // The actual content of the message, possibly as a JSON string
  conv_date: string; // Date and time when the message was sent
  conv_id: number; // Unique identifier for the message
  conv_json: number; // Indicates if the content is JSON (1) or not (0)
  conv_type: string; // The type of message or command
  conv_user: number; // Identifier for the user who sent the message
}
