import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginData, ILoginInfo, IUser } from 'src/app/auth/models/user.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Signup': props<{ userData: IUser }>(),
    'User Signup Success': props<{ redirect: boolean }>(),
    'User Signup Failure': props<{ existingEmails: string[] }>(),
    'User Signin': props<{ loginData: ILoginData }>(),
    'User Signin Success': props<{
      redirect: boolean;
      loginInfo: ILoginInfo | null;
    }>(),
    'User Signin Failure': props<{ res: boolean }>(),
    'User Logout': emptyProps(),
    'User Logout Success': props<{ redirect: boolean }>(),
    'User Logout Failure': props<{ err: boolean }>(),
  },
});
