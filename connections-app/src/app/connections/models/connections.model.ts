export interface IGroupItem {
  id: string;
  name: string;
  createdAt?: string;
  createdBy: string;
}

export interface IGroupItemResponse {
  id: {
    S: string;
  };
  name: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

export interface IGroupsResponse {
  Count: number;
  Items: IGroupItemResponse[];
}

export interface IUserItem {
  name: string;
  uid: string;
}

export interface IUserItemWithConversation {
  name: string;
  uid: string;
  conversationID: string | null;
}

export interface IUserItemResponse {
  name: { S: string };
  uid: { S: string };
}

export interface IUsersResponse {
  Count: number;
  Items: IUserItemResponse[];
}

export interface IConversationItem {
  id: string;
  companionID: string;
}

export interface IConversationItemResponse {
  id: { S: string };
  companionID: { S: string };
}

export interface IConversationsResponse {
  Count: number;
  Items: IConversationItemResponse[];
}
