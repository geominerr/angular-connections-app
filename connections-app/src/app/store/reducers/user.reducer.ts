import { createReducer, on } from '@ngrx/store';

import { IErrorResponse, TUserAction } from 'src/app/core/models/general.model';

import { UserActions } from '../actions/user.actions';
import { StoreActions } from '../actions/store.actions';
import { ProfileActions } from '../actions/profile.actions';

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
  isLogout: boolean;
  error: null | IErrorResponse;
  successAction: null | TUserAction;
}

export const initialState: State = {
  sendRequest: false,
  loginInfo: null,
  userProfile: null,
  isCreated: false,
  isLogged: false,
  isLogout: false,
  error: null,
  successAction: null,
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.userSignup,
    (state): State => ({
      ...state,
      sendRequest: true,
      isLogout: false,
      successAction: null,
    })
  ),
  on(
    UserActions.userSignupSuccess,
    (state, { redirect }): State => ({
      ...state,
      sendRequest: false,
      isCreated: redirect,
      successAction: 'signup',
    })
  ),
  on(
    UserActions.userSignupFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      isCreated: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    StoreActions.storeUpdate,
    (state, { savedState }): State => ({
      ...state,
      ...savedState,
      isCreated: false,
      isLogged: false,
      sendRequest: false,
      userProfile: null,
      isLogout: false,
      successAction: null,
      error: null,
    })
  ),
  on(
    UserActions.userSignin,
    (state): State => ({
      ...state,
      sendRequest: true,
      isLogout: false,
      successAction: null,
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
      successAction: 'signin',
    })
  ),
  on(
    UserActions.userSigninFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    UserActions.userLogout,
    (state): State => ({
      ...state,
      sendRequest: true,
      successAction: null,
    })
  ),
  on(
    UserActions.userLogoutFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      error: { ...error },
    })
  ),
  on(
    UserActions.userLogoutSuccess,
    (state): State => ({
      ...state,
      isLogout: true,
      sendRequest: false,
      userProfile: null,
      loginInfo: null,
      isLogged: false,
      isCreated: false,
      successAction: 'logout',
    })
  ),
  on(
    ProfileActions.profileLoad,
    (state): State => ({
      ...state,
      successAction: null,
    })
  ),
  on(
    ProfileActions.profileSuccess,
    (state, { userInfo }): State => ({
      ...state,
      userProfile: { ...userInfo },
      successAction: null,
    })
  ),
  on(
    ProfileActions.profileFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ProfileActions.profileUpdate,
    (state): State => ({
      ...state,
      sendRequest: true,
      successAction: null,
    })
  ),
  on(
    ProfileActions.profileUpdateSuccess,
    (state, { userName }): State => ({
      ...state,
      sendRequest: false,
      userProfile: {
        ...state.userProfile,
        name: userName,
        email: state.userProfile?.email || '',
        uid: state.userProfile?.uid || '',
        createdAt: state.userProfile?.createdAt || '',
      },
      successAction: 'profileUpdate',
    })
  ),
  on(
    ProfileActions.profileUpdateFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  )
);
