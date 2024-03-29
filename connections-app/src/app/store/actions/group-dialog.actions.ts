import { createActionGroup, props } from '@ngrx/store';
import { IGroupDialog } from 'src/app/connections/models/group-dialog.model';
import { IErrorResponse } from 'src/app/core/models/general.model';

export const GroupDialogActions = createActionGroup({
  source: 'GroupDialog',
  events: {
    'Load GroupDialog': props<{
      groupID: string;
      creatorID: string | null;
      groupName: string;
    }>(),
    'Load GroupDialog Success': props<{
      groupDialog: IGroupDialog;
      groupID: string;
    }>(),
    'Load GroupDialog Failure': props<{ error: IErrorResponse }>(),
    'Update GroupDialog': props<{ groupID: string }>(),
    'Update GroupDialog Success': props<{
      groupDialog: IGroupDialog;
      groupID: string;
    }>(),
    'Update GroupDialog Failure': props<{ error: IErrorResponse }>(),
    'Delete Dialog': props<{ groupID: string }>(),
    'Send Message': props<{ groupID: string; message: string }>(),
    'Send Message Success': props<{ groupID: string }>(),
    'Send Message Failure': props<{ error: IErrorResponse }>(),
  },
});
