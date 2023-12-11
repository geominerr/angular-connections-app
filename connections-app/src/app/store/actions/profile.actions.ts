import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUserProfile } from 'src/app/profile/models/profile.model';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Profile Load': emptyProps(),
    'Profile Update': props<{ userName: string }>(),
    'Profile Success': props<{ userInfo: IUserProfile }>(),
    'Profile Update Success': props<{ userName: string }>(),
    'Profile Update Failure': emptyProps(),
    'Profile Failure': props<{ error: unknown }>(),
  },
});
