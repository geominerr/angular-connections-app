import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  IConversationItem,
  IUserItem,
} from 'src/app/connections/models/connections.model';
import { IErrorResponse } from 'src/app/core/models/general.model';

export const ConversationActions = createActionGroup({
  source: 'Conversation',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: IUserItem[] }>(),
    'Load Users Failure': props<{ error: IErrorResponse }>(),
    'Load Conversation': emptyProps(),
    'Load Conversation Success': props<{
      conversations: IConversationItem[];
    }>(),
    'Load Conversation Failure': props<{ error: IErrorResponse }>(),
    'Update Users': emptyProps(),
    'Update Users Success': props<{ users: IUserItem[] }>(),
    'Update Users Failure': props<{ error: IErrorResponse }>(),
    'Open Conversation': props<{
      companionID: string;
    }>(),
    'Open Conversation Success': props<IConversationItem>(),
    'Create Conversation': props<{ companionID: string }>(),
    'Create Conversation Success': props<IConversationItem>(),
    'Create Conversation Failure': props<{ error: IErrorResponse }>(),
  },
});
