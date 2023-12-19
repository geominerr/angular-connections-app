import { createReducer, on } from '@ngrx/store';
import { IGroupDialog } from 'src/app/connections/models/group-dialog.model';
import { GroupDialogActions } from '../actions/group-dialog.actions';
import { StoreActions } from '../actions/store.actions';

export const groupDialogFeatureKey = 'groupDialog';

export interface State {
  groupDialogs: Record<string, IGroupDialog>;
}

export const initialState: State = {
  groupDialogs: {},
};

export const groupDialogReducer = createReducer(
  initialState,
  on(
    StoreActions.storeUpdateDialogs,
    (state, { savedDialogs }): State => ({
      ...state,
      groupDialogs: { ...savedDialogs.groupDialogs },
    })
  ),
  on(
    GroupDialogActions.loadGroupDialogSuccess,
    (state, { groupDialog, groupID }): State => ({
      ...state,
      groupDialogs: { ...state.groupDialogs, [groupID]: groupDialog },
    })
  ),
  on(
    GroupDialogActions.updateGroupDialogSuccess,
    (state, { groupDialog, groupID }): State => ({
      ...state,
      groupDialogs: {
        ...state.groupDialogs,
        [groupID]: {
          ...state.groupDialogs[groupID],
          ...groupDialog,
          items: [
            ...(state.groupDialogs?.[groupID]?.items || []),
            ...groupDialog.items,
          ],
        },
      },
    })
  ),
  on(GroupDialogActions.deleteDialog, (state, { groupID }): State => {
    const { [groupID]: deleted, ...otherDialogs } = state.groupDialogs;
    return {
      ...state,
      groupDialogs: { ...otherDialogs },
    };
  }),
);
