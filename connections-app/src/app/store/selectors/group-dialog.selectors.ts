import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IGroupDialogConverted,
  IMessage,
} from 'src/app/connections/models/group-dialog.model';
import { State, groupDialogFeatureKey } from '../reducers/group-dialog.reducer';
import { State as State2 } from '../reducers/user.reducer';
import { selectAuthState } from './user.selectors';

const selectGroupDialogState = createFeatureSelector<State>(
  groupDialogFeatureKey
);

export const selectGroupDialog = (id: string) =>
  createSelector(
    selectGroupDialogState,
    selectAuthState,
    (state: State, state2: State2): IGroupDialogConverted | null => {
      if (!state?.groupDialogs?.[id]) {
        return null;
      }

      const items: IMessage[] = state?.groupDialogs?.[id]?.items
        .map((item) => ({
          authorName: state2.userNames?.[item.authorID.S] || 'Deleted user :-(',
          createdAt: item.createdAt.S,
          message: item.message.S,
          isCurrUserAuthor: item.authorID.S === state2?.loginInfo?.uid,
        }))
        .sort((a, b) => +a.createdAt - +b.createdAt);

      return {
        ...state.groupDialogs[id],
        items,
      };
    }
  );

export const selectAllGroupDialogs = createSelector(
  selectGroupDialogState,
  (state: State) => state
);
