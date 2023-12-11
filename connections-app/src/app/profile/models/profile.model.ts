export interface IProfile {
  email: {
    S: string;
  };
  name: {
    S: string;
  };
  uid: {
    S: string;
  };
  createdAt: {
    S: string;
  };
}

export interface IUserProfile {
  email: string;
  name: string;
  uid: string;
  createdAt: string;
}

export interface IProfileResponseError {
  type: string;
  message: string;
}
