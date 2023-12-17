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
import { ConversationActions } from '../actions/conversation.actions';

export const userFeatureKey = 'user';

export interface State {
  sendRequest: boolean;
  groups: null | IGroupItem[];
  users: null | IUserItem[];
  conversation: null | Record<string, { conversationID: string }>;
  currentConversation: null | string;
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
  conversation: null,
  currentConversation: null,
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
      sendRequest: false,
      userProfile: null,
      successAction: null,
      error: null,
      // groups: null,
      // users: null,
      // conversation: null,
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
      successAction: 'logout',
    })
  ),
  on(
    ProfileActions.profileLoad,
    (state): State => ({
      ...state,
      successAction: null,
      error: null,
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
      sendRequest: true,
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
      successAction: 'groupList',
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
      sendRequest: false,
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
      successAction: 'userList',
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
      error: null,
      successAction: null,
    })
  ),
  on(
    ConversationActions.loadConversationSuccess,
    (state, { conversations }): State => ({
      ...state,
      sendRequest: false,
      conversation: {
        ...conversations.reduce((acc, curr) => {
          acc[curr.companionID] = {
            conversationID: curr.companionID,
          };

          return acc;
        }, {} as Record<string, { conversationID: string }>),
      },
      successAction: 'conversationsList',
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
    ConversationActions.createConversationSuccess,
    (state, { id, companionID }): State => ({
      ...state,
      sendRequest: false,
      error: null,
      successAction: null,
      conversation: {
        ...state.conversation,
        [companionID]: { conversationID: id },
      },
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
  )
);
