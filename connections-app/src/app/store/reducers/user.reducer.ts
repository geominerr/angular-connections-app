import { createReducer, on } from '@ngrx/store';
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
  signinError: boolean;
  existingEmails: string[];
  editProfileError: boolean;
  logoutError: boolean;
}

export const initialState: State = {
  sendRequest: false,
  loginInfo: null,
  userProfile: null,
  isCreated: false,
  isLogged: false,
  isLogout: false,
  signinError: false,
  existingEmails: [],
  editProfileError: false,
  logoutError: false,
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.userSignup,
    (state): State => ({
      ...state,
      sendRequest: true,
      isLogout: false,
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
      sendRequest: false,
      editProfileError: false,
      userProfile: null,
      isLogout: false,
    })
  ),
  on(
    UserActions.userSignin,
    (state): State => ({
      ...state,
      sendRequest: true,
      signinError: false,
      isLogout: false,
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
  ),
  on(
    UserActions.userLogout,
    (state): State => ({
      ...state,
      sendRequest: true,
    })
  ),
  on(
    UserActions.userLogoutFailure,
    (state): State => ({
      ...state,
      sendRequest: false,
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
      existingEmails: [],
      editProfileError: false,
    })
  ),
  on(
    ProfileActions.profileLoad,
    (state): State => ({
      ...state,
    })
  ),
  on(
    ProfileActions.profileSuccess,
    (state, { userInfo }): State => ({
      ...state,
      userProfile: { ...userInfo },
    })
  ),
  on(
    ProfileActions.profileFailure,
    (state): State => ({
      ...state,
      sendRequest: false,
    })
  ),
  on(
    ProfileActions.profileUpdate,
    (state): State => ({
      ...state,
      sendRequest: true,
      editProfileError: false,
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
      editProfileError: false,
    })
  ),
  on(
    ProfileActions.profileUpdateFailure,
    (state): State => ({
      ...state,
      sendRequest: false,
      editProfileError: true,
    })
  )
);
