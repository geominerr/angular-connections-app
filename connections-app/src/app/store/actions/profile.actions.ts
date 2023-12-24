import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IErrorResponse } from 'src/app/core/models/general.model';
import { IUserProfile } from 'src/app/profile/models/profile.model';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Profile Load': emptyProps(),
    'Profile Success': props<{ userInfo: IUserProfile }>(),
    'Profile Failure': props<{ error: IErrorResponse }>(),
    'Profile Update': props<{ userName: string }>(),
    'Profile Update Success': props<{ userName: string }>(),
    'Profile Update Failure': props<{ error: IErrorResponse }>(),
  },
});
