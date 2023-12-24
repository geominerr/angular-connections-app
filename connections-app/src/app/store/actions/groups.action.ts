import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IErrorResponse } from 'src/app/core/models/general.model';
import { IGroupItem } from 'src/app/connections/models/connections.model';

export const GroupActions = createActionGroup({
  source: 'Group',
  events: {
    'Group Load': emptyProps(),
    'Group Load Success': props<{ count: number; items: IGroupItem[] }>(),
    'Group Load Failure': props<{ error: IErrorResponse }>(),
    'Group Create': props<{ name: string }>(),
    'Group Create Success': props<{ groupID: string; name: string }>(),
    'Group Create Failure': props<{ error: IErrorResponse }>(),
    'Group Remove': props<{ groupID: string }>(),
    'Group Remove Success': props<{ groupID: string }>(),
    'Group Remove Failure': props<{ error: IErrorResponse }>(),
    'Group Update': emptyProps(),
    'Group Update Success': props<{ count: number; items: IGroupItem[] }>(),
    'Group Update Failure': props<{ error: IErrorResponse }>(),
  },
});
