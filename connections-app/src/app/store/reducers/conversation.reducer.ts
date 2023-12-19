import { createReducer, on } from '@ngrx/store';
import {
  IConversation,
  IConversationInfo,
} from 'src/app/connections/models/conversation.model';
import { ConversationActions } from '../actions/conversation.actions';
import { StoreActions } from '../actions/store.actions';

export const conversationFeatureKey = 'conversation';

export interface State {
  conversations: null | Record<string, IConversationInfo>;
  conversationsMap: Record<string, IConversation>;
}

export const initialState: State = {
  conversations: null,
  conversationsMap: {},
};

export const conversationReducer = createReducer(
  initialState,
  on(
    StoreActions.storeUpdateConversations,
    (state, { savedConversations }): State => {
      return {
        ...state,
        conversations: {
          ...(savedConversations?.conversations || {}),
        },
      };
    }
  ),
  on(
    ConversationActions.loadConversation,
    (state): State => ({
      ...state,
    })
  ),
  on(
    ConversationActions.loadConversationSuccess,
    (state, { conversations }): State => ({
      ...state,
      conversations: {
        ...conversations.reduce((acc, curr) => {
          acc[curr.companionID] = {
            conversationID: curr.id,
            companionID: curr.companionID,
          };

          return acc;
        }, {} as Record<string, IConversationInfo>),
      },
    })
  ),
  on(
    ConversationActions.createConversationSuccess,
    (state, { id, companionID }): State => ({
      ...state,
      conversations: {
        ...state.conversations,
        [companionID]: {
          ...state.conversations?.[companionID],
          conversationID: id,
        },
      },
    })
  ),
  on(
    ConversationActions.openConversationSuccess,
    (state, { id, companionID }): State => ({
      ...state,
      conversations: {
        ...state.conversations,
        [companionID]: {
          ...state.conversations?.[companionID],
          conversationID: id,
        },
      },
    })
  ),
  on(
    ConversationActions.getConversationMessageSuccess,
    (state, { conversationID, since, items }): State => ({
      ...state,
      conversationsMap: {
        ...state.conversationsMap,
        [conversationID]: {
          since,
          items: [
            ...(state.conversationsMap?.[conversationID]?.items || []),
            ...(items || []),
          ],
        },
      },
    })
  ),
  on(
    ConversationActions.removeConversationSuccess,
    (state, { conversationID }): State => {
      const { [conversationID]: deleted, ...otherConversations } =
        state.conversationsMap;
      let updatedConversations: Record<string, IConversationInfo> = {};

      if (state.conversations) {
        updatedConversations = Object.keys(state.conversations).reduce(
          (acc, curr) => {
            const convID = state.conversations?.[curr]?.conversationID;
            if (convID && convID !== conversationID) {
              acc[curr] = state.conversations?.[curr] as IConversationInfo;
            }

            return acc;
          },
          {} as Record<string, IConversationInfo>
        );
      }
      return {
        ...state,
        conversations: {
          ...updatedConversations,
        },
        conversationsMap: { ...otherConversations },
      };
    }
  )
);
