export interface IGroupMessage {
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

export interface IGroupMessagesResponse {
  Count: number;
  Items: IGroupMessage[];
}

export interface IGroupDialog {
  since: number;
  items: IGroupMessage[];
  creatorID?: string | null;
  groupName?: string;
}

export interface IGroupDialogParams {
  groupID: string;
  since?: number;
}

export interface IGroupMessageParams {
  groupID: string;
  message: string;
}

export interface IGroupDialogConverted {
  since: number;
  items: IMessage[];
  creatorID?: string | null;
  groupName?: string;
}

export interface IMessage {
  authorName: string;
  message: string;
  createdAt: string;
  isCurrUserAuthor: boolean;
}

export interface IGroupMessageNew {
  groupID: string;
  message: string;
  authorID: string;
}
