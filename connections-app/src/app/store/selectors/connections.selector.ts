import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserItemWithConversation } from 'src/app/connections/models/connections.model';
import { State, userFeatureKey } from '../reducers/user.reducer';
import { State as ConversationState } from '../reducers/conversation.reducer';
import { selectConversationState } from './conversation.selectors';

const selectState = createFeatureSelector<State>(userFeatureKey);

export const selectGroups = createSelector(
  selectState,
  (state: State) => state.groups
);

export const selectUserList = createSelector(
  selectState,
  (state: State) => state.users
);

export const selectUserListNew = createSelector(
  selectState,
  selectConversationState,
  (state: State, state2: ConversationState): IUserItemWithConversation[] => {
    const conversations = state2.conversations;
    const currentUserID = state.loginInfo?.uid;

    const res = state?.users
      ?.filter((user) => user.uid !== currentUserID)
      .map(
        (user): IUserItemWithConversation => ({
          name: user.name,
          uid: user.uid,
          conversationID: conversations?.[user.uid]?.conversationID || null,
        })
      ) as IUserItemWithConversation[];

    return res;
  }
);

// export const selectConversations = createSelector(
//   selectState,
//   (state: State) => state.conversation
// );
