import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILoginData, ILoginInfo, IUser } from 'src/app/auth/models/user.model';
import { IErrorResponse } from 'src/app/core/models/general.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'User Signup': props<{ userData: IUser }>(),
    'User Signup Success': props<{ redirect: boolean }>(),
    'User Signup Failure': props<{ error: IErrorResponse }>(),
    'User Signin': props<{ loginData: ILoginData }>(),
    'User Signin Success': props<{
      redirect: boolean;
      loginInfo: ILoginInfo | null;
    }>(),
    'User Signin Failure': props<{ error: IErrorResponse }>(),
    'User Logout': emptyProps(),
    'User Logout Success': props<{ redirect: boolean }>(),
    'User Logout Failure': props<{ error: IErrorResponse }>(),
  },
});
