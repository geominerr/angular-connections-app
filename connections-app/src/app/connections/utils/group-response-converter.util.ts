import {
  IGroupItem,
  IGroupItemResponse,
  IGroupsResponse,
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
