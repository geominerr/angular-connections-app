import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IGroupDialog } from 'src/app/connections/models/group-dialog.model';

interface State {
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
}

interface DialogState {
  groupDialogs: Record<string, IGroupDialog>;
}

export const StoreActions = createActionGroup({
  source: 'Store',
  events: {
    'Store Update': props<{ savedState: State }>(),
    'Store Change Theme': emptyProps(),
    'Store Update Dialogs': props<{ savedDialogs: DialogState }>(),
  },
});
