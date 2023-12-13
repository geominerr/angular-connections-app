export interface IHeadersAuth {
  'rs-uid': string;
  'rs-email': string;
  Authorization: string;
}

export interface IErrorResponse {
  action: TUserAction;
  error: IErrorBody;
}

export interface IErrorBody {
  type: string;
  message: string;
}

export type TUserAction =
  | 'signin'
  | 'signup'
  | 'profile'
  | 'profileUpdate'
  | 'logout';

export interface IActionMessage {
  success: string;
  error: Record<string, string>;
}
