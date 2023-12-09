export interface ISignupResponse {
  status: number;
  result: boolean;
}

export interface ISigninResponse {
  status: number;
  body?: {
    token: string;
    uid: string;
  };
}

export interface ISignupError {
  status: number;
  result: boolean;
  error: {
    type: string;
    message: string;
  };
  email: string;
}
