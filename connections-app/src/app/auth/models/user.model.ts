export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginInfo {
  token: string;
  uid: string;
  email: string;
}

export interface ILoginResponse {
  status: number;
  authInfo: ILoginInfo;
}
