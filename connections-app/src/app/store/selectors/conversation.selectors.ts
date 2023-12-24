import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMessage } from 'src/app/connections/models/group-dialog.model';
import {
  State,
  conversationFeatureKey,
} from '../reducers/conversation.reducer';

import { selectAuthState } from './user.selectors';
import { State as UserState } from '../reducers/user.reducer';

export const selectConversationState = createFeatureSelector<State>(
  conversationFeatureKey
);

export const selectConversations = createSelector(
  selectConversationState,
  (state: State) => state.conversations
);

export const selectAllConversations = createSelector(
  selectConversationState,
  (state: State) => state
);

export const selectAllConversationsMap = createSelector(
  selectConversationState,
  (state: State) => state.conversationsMap
);

export const selectConversationByID = (id: string) =>
  createSelector(
    selectConversationState,
    selectAuthState,
    (state: State, state2: UserState): IMessage[] | null => {
      if (!state?.conversationsMap?.[id]) {
        return null;
      }

      return state.conversationsMap[id].items.map(
        (item): IMessage => ({
          authorName: state2?.userNames?.[item.authorID.S] || 'Not found',
          isCurrUserAuthor: item.authorID.S === state2.loginInfo?.uid,
          message: item.message.S,
          createdAt: item.createdAt.S,
        })
      );
    }
  );
