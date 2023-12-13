import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSignup),
      mergeMap((action) =>
        this.authService.signupUser(action.userData).pipe(
          map((res) => {
            if (res.status === 201) {
              return UserActions.userSignupSuccess({ redirect: true });
            }
            return UserActions.userSignupSuccess({ redirect: false });
          }),
          catchError((err) =>
            of(UserActions.userSignupFailure({ existingEmails: err }))
          )
        )
      )
    );
  });

  signupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.userSignupSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/signin']);
          }
        })
      );
    },
    { dispatch: false }
  );

  signin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSignin),
      mergeMap((action) =>
        this.authService.signinUser(action.loginData).pipe(
          map((res) => {
            console.log(res);
            if (res.status === 200) {
              return UserActions.userSigninSuccess({
                redirect: true,
                loginInfo: res.authInfo,
              });
            }

            return UserActions.userSigninSuccess({
              redirect: false,
              loginInfo: null,
            });
          }),
          catchError((res: boolean) =>
            of(UserActions.userSigninFailure({ res }))
          )
        )
      )
    );
  });

  signinSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.userSigninSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userLogout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(() => UserActions.userLogoutSuccess({ redirect: true })),
          catchError(() => of(UserActions.userLogoutFailure({ err: true })))
        )
      )
    );
  });

  logoutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.userLogoutSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/signin']);
          }
        })
      );
    },
    { dispatch: false }
  );
}
