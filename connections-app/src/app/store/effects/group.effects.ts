import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  switchMap,
  map,
  catchError,
  of,
  mergeMap,
  concat,
  filter,
  take,
  tap,
} from 'rxjs';

import { ConnectionsService } from 'src/app/connections/services/group.service';
import { IGroupItem } from 'src/app/connections/models/connections.model';
import { selectGroups } from '../selectors/connections.selector';

import { GroupActions } from '../actions/groups.action';
import { TimerActions } from '../actions/timer.actions';
import { GroupDialogActions } from '../actions/group-dialog.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private connectionsService: ConnectionsService,
    private store: Store
  ) {}

  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupLoad),
      switchMap(() =>
        this.store.select(selectGroups).pipe(
          take(1),
          filter((groups) => !groups),
          mergeMap(() =>
            this.connectionsService.getGroupList().pipe(
              map((res: IGroupItem[]) =>
                GroupActions.groupLoadSuccess({ count: 1, items: res })
              ),
              catchError((error) =>
                of(GroupActions.groupLoadFailure({ error }))
              )
            )
          )
        )
      )
    );
  });

  createGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupCreate),
      mergeMap((action) =>
        this.connectionsService.createGroup(action.name).pipe(
          map((res) =>
            GroupActions.groupCreateSuccess({
              groupID: res,
              name: action.name,
            })
          ),
          catchError((error) => of(GroupActions.groupCreateFailure({ error })))
        )
      )
    );
  });

  deleteGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupRemove),
      mergeMap((action) =>
        this.connectionsService.removeGroup({ groupID: action.groupID }).pipe(
          mergeMap(() => [
            GroupActions.groupRemoveSuccess({
              groupID: action.groupID,
            }),
            GroupDialogActions.deleteDialog({
              groupID: action.groupID,
            }),
          ]),
          catchError((error) => of(GroupActions.groupRemoveFailure({ error })))
        )
      )
    );
  });

  updateGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupUpdate),
      switchMap(() =>
        this.connectionsService.getGroupList().pipe(
          switchMap((res: IGroupItem[]) =>
            concat(
              of(GroupActions.groupUpdateSuccess({ count: 1, items: res })),
              of(TimerActions.timerGroupStart({ timeDuration: 60 }))
            )
          ),
          catchError((error) => of(GroupActions.groupUpdateFailure({ error })))
        )
      )
    );
  });

  deleteGroupSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.groupRemoveSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}
