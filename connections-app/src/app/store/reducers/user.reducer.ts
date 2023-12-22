import { createReducer, on } from '@ngrx/store';

import { IErrorResponse, TUserAction } from 'src/app/core/models/general.model';
import {
  IGroupItem,
  IUserItem,
} from 'src/app/connections/models/connections.model';

import { UserActions } from '../actions/user.actions';
import { StoreActions } from '../actions/store.actions';
import { ProfileActions } from '../actions/profile.actions';
import { GroupActions } from '../actions/groups.action';
import { GroupDialogActions } from '../actions/group-dialog.actions';
import { ConversationActions } from '../actions/conversation.actions';

export const userFeatureKey = 'user';

export interface State {
  sendRequest: boolean;
  groups: null | IGroupItem[];
  users: null | IUserItem[];
  userNames: Record<string, string>;
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
  darkTheme: boolean;
  error: null | IErrorResponse;
  successAction: null | TUserAction;
}

export const initialState: State = {
  sendRequest: false,
  groups: null,
  users: null,
  userNames: {},
  loginInfo: null,
  userProfile: null,
  darkTheme: false,
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
      successAction: null,
      error: null,
    })
  ),
  on(
    UserActions.userSignupSuccess,
    (state): State => ({
      ...state,
      sendRequest: false,
      successAction: 'signup',
    })
  ),
  on(
    UserActions.userSignupFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    StoreActions.storeUpdate,
    (state, { savedState }): State => ({
      ...state,
      ...savedState,
    })
  ),
  on(
    StoreActions.storeChangeTheme,
    (state): State => ({
      ...state,
      darkTheme: !state.darkTheme,
    })
  ),
  on(
    UserActions.userSignin,
    (state): State => ({
      ...state,
      sendRequest: true,
      successAction: null,
      error: null,
    })
  ),
  on(
    UserActions.userSigninSuccess,
    (state, { loginInfo }): State => ({
      ...state,
      sendRequest: false,
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
      error: null,
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
      sendRequest: false,
      userProfile: null,
      loginInfo: null,
      groups: null,
      users: null,
      userNames: {},
      successAction: 'logout',
    })
  ),
  on(
    ProfileActions.profileLoad,
    (state): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: null,
    })
  ),
  on(
    ProfileActions.profileSuccess,
    (state, { userInfo }): State => ({
      ...state,
      sendRequest: false,
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
      error: null,
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
  ),
  on(
    GroupActions.groupLoad,
    (state): State => ({
      ...state,
      // sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(
    GroupActions.groupLoadSuccess,
    (state, { items }): State => ({
      ...state,
      sendRequest: false,
      groups: [...items],
      successAction: null,
    })
  ),
  on(
    GroupActions.groupLoadFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    GroupActions.groupCreate,
    (state): State => ({
      ...state,
      sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(GroupActions.groupCreateSuccess, (state, { name, groupID }): State => {
    const createdBy: string = state.loginInfo?.uid as string;
    const newGroup: IGroupItem = {
      name,
      id: groupID,
      createdBy,
    };

    return {
      ...state,
      sendRequest: false,
      successAction: 'groupCreate',
      groups: [newGroup, ...(state.groups || [])],
      error: null,
    };
  }),
  on(
    GroupActions.groupCreateFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    GroupActions.groupRemove,
    (state): State => ({
      ...state,
      sendRequest: true,
      successAction: null,
      error: null,
    })
  ),
  on(
    GroupActions.groupRemoveSuccess,
    (state, { groupID }): State => ({
      ...state,
      sendRequest: false,
      successAction: 'groupRemove',
      error: null,
      groups: [...(state?.groups?.filter((item) => item.id !== groupID) || [])],
    })
  ),
  on(
    GroupActions.groupRemoveFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    GroupActions.groupUpdate,
    (state): State => ({
      ...state,
      sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(
    GroupActions.groupUpdateSuccess,
    (state, { items }): State => ({
      ...state,
      sendRequest: false,
      groups: [...items],
      successAction: 'groupUpdate',
    })
  ),
  on(
    GroupActions.groupUpdateFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ConversationActions.loadUsers,
    (state): State => ({
      ...state,
      // sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(
    ConversationActions.loadUsersSuccess,
    (state, { users }): State => ({
      ...state,
      sendRequest: false,
      users: [...users],
      userNames: {
        ...users.reduce((acc, curr) => {
          acc[curr.uid] = curr.name;

          return acc;
        }, {} as Record<string, string>),
      },
      successAction: null,
    })
  ),
  on(
    ConversationActions.loadUsersFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ConversationActions.loadConversation,
    (state): State => ({
      ...state,
      sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(
    ConversationActions.loadConversationSuccess,
    (state): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
    })
  ),
  on(
    ConversationActions.loadConversationFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ConversationActions.updateUsers,
    (state): State => ({
      ...state,
      sendRequest: true,
      error: null,
      successAction: null,
    })
  ),
  on(
    ConversationActions.updateUsersSuccess,
    (state, { users }): State => ({
      ...state,
      sendRequest: false,
      users: [...users],
      userNames: {
        ...users.reduce((acc, curr) => {
          acc[curr.uid] = curr.name;

          return acc;
        }, {} as Record<string, string>),
      },
      successAction: 'userListUpdate',
    })
  ),
  on(
    ConversationActions.updateUsersFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ConversationActions.createConversationFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    GroupDialogActions.updateGroupDialog,
    (state): State => ({
      ...state,
      sendRequest: true,
      successAction: null,
      error: null,
    })
  ),
  on(
    GroupDialogActions.updateGroupDialogSuccess,
    (state): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: null,
    })
  ),
  on(
    GroupDialogActions.updateGroupDialogFailure,
    (state, { error }): State => ({
      ...state,
      sendRequest: false,
      successAction: null,
      error: { ...error },
    })
  ),
  on(
    ConversationActions.getConversationMessageFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
  on(
    ConversationActions.removeConversationFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
  on(
    ConversationActions.sendMessageFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
  on(
    GroupDialogActions.loadGroupDialogFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
  on(
    GroupDialogActions.updateGroupDialogFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
  on(
    GroupDialogActions.sendMessageFailure,
    (state, { error }): State => {
      return {
        ...state,
        sendRequest: false,
        successAction: null,
        error: { ...error },
      };
    }
  ),
);
