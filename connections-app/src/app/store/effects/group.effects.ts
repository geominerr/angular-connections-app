import { Injectable } from '@angular/core';

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
} from 'rxjs';

import { ConnectionsService } from 'src/app/connections/services/connections.service';
import { IGroupItem } from 'src/app/connections/models/connections.model';
import { selectGroups } from '../selectors/connections.selector';

import { GroupActions } from '../actions/groups.action';
import { TimerActions } from '../actions/timer.actions';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
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
          map(() =>
            GroupActions.groupRemoveSuccess({
              groupID: action.groupID,
            })
          ),
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
}
