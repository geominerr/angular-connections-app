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
