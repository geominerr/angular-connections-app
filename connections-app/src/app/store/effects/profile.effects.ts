import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, take, catchError, map, mergeMap, of, filter } from 'rxjs';

import { ProfileService } from 'src/app/profile/services/profile.service';
import { IUserProfile } from 'src/app/profile/models/profile.model';
import { ProfileActions } from '../actions/profile.actions';
import { selectUserProfile } from '../selectors/user.selectors';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private store: Store
  ) {}

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.profileLoad),
      switchMap(() =>
        this.store.select(selectUserProfile).pipe(
          take(1),
          filter((profile) => !profile),
          mergeMap(() => {
            return this.profileService.getProfile().pipe(
              map((userProfile: IUserProfile) =>
                ProfileActions.profileSuccess({
                  userInfo: userProfile,
                })
              ),
              catchError((error) =>
                of(ProfileActions.profileFailure({ error }))
              )
            );
          })
        )
      )
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.profileUpdate),
      mergeMap((action) =>
        this.profileService.updateProfile(action.userName).pipe(
          map(() =>
            ProfileActions.profileUpdateSuccess({
              userName: action.userName,
            })
          ),
          catchError((error) =>
            of(ProfileActions.profileUpdateFailure({ error }))
          )
        )
      )
    );
  });
}
