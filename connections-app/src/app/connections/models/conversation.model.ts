import { IMessage } from './group-dialog.model';

export interface IConversationMessageRequestQuery {
  conversationID: string;
  since?: number;
}
export interface IConversationMessageRequestBody {
  conversationID: string;
  message: string;
}

export interface IConversationResponse {
  Count: number;
  Items: IConversationMessageResponse[];
}

export interface IConversationMessageResponse {
  authorID: {
    S: string;
  };
  message: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface IConversationMessage {
  authorName: string;
  message: string;
  createdAt: string;
  isCurrUserAuthor: boolean;
}

export interface IConversation {
  items: IConversationMessageResponse[];
  since: number;
}

export interface IConversationInfo {
  companionID?: string;
  conversationID: string;
}

export interface IConversationForComponent {
  companionName: string;
  items: IMessage[];
}
