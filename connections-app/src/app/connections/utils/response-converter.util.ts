import {
  IConversationItem,
  IConversationItemResponse,
  IConversationsResponse,
  IGroupItem,
  IGroupItemResponse,
  IGroupsResponse,
  IUserItem,
  IUserItemResponse,
  IUsersResponse,
} from '../models/connections.model';

export const groupResponseConverter = (
  response: IGroupsResponse
): IGroupItem[] =>
  response?.Items?.map(
    (item: IGroupItemResponse): IGroupItem => ({
      id: item?.id?.S,
      name: item?.name?.S,
      createdAt: item?.createdAt?.S,
      createdBy: item?.createdBy?.S,
    })
  );

export const usersResponseConverter = (response: IUsersResponse): IUserItem[] =>
  response?.Items?.map(
    (item: IUserItemResponse): IUserItem => ({
      uid: item?.uid?.S,
      name: item?.name?.S,
    })
  );

export const conversationsResponseConverter = (
  response: IConversationsResponse
): IConversationItem[] =>
  response?.Items?.map(
    (item: IConversationItemResponse): IConversationItem => ({
      id: item?.id?.S,
      companionID: item?.companionID?.S,
    })
  );
