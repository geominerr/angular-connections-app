import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { StoreActions } from '../actions/store.actions';

export const userFeatureKey = 'user';

export interface State {
  sendRequest: boolean;
  loginInfo: null | {
    token: string;
    uid: string;
    email: string;
  };
  userProfile: null | {
    email: string;
    name: string;
    uid: string;
    createdAt: string;
  };
  isCreated: boolean;
  isLogged: boolean;
  signinError: boolean;
  existingEmails: string[];
}

export const initialState: State = {
  sendRequest: false,
  loginInfo: null,
  userProfile: null,
  isCreated: false,
  isLogged: false,
  signinError: false,
  existingEmails: [],
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.userSignup,
    (state): State => ({
      ...state,
      sendRequest: true,
    })
  ),
  on(
    UserActions.userSignupSuccess,
    (state, { redirect }): State => ({
      ...state,
      sendRequest: false,
      isCreated: redirect,
    })
  ),
  on(
    UserActions.userSignupFailure,
    (state, { existingEmails }): State => ({
      ...state,
      sendRequest: false,
      isCreated: false,
      existingEmails: [...existingEmails],
    })
  ),
  on(
    StoreActions.storeUpdate,
    (state, { savedState }): State => ({
      ...state,
      ...savedState,
      existingEmails: [],
      signinError: false,
      isCreated: false,
      isLogged: false,
    })
  ),
  on(
    UserActions.userSignin,
    (state): State => ({
      ...state,
      sendRequest: true,
      signinError: false,
    })
  ),
  on(
    UserActions.userSigninSuccess,
    (state, { redirect, loginInfo }): State => ({
      ...state,
      sendRequest: false,
      isCreated: redirect,
      isLogged: true,
      loginInfo,
    })
  ),
  on(
    UserActions.userSigninFailure,
    (state, { res }): State => ({
      ...state,
      sendRequest: false,
      signinError: res,
    })
  )
);
