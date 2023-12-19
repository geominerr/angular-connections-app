import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  switchMap,
  map,
  mergeMap,
  catchError,
  of,
  take,
  filter,
  concat,
} from 'rxjs';
import {
  IGroupDialog,
  IGroupDialogParams,
} from 'src/app/connections/models/group-dialog.model';
import { ConnectionsService } from 'src/app/connections/services/group.service';
import { GroupDialogActions } from '../actions/group-dialog.actions';
import { TimerActions } from '../actions/timer.actions';
import { selectGroupDialog } from '../selectors/group-dialog.selectors';

@Injectable()
export class GroupDialogEffects {
  constructor(
    private actions$: Actions,
    private groupService: ConnectionsService,
    private store: Store
  ) {}

  loadGroupDialog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupDialogActions.loadGroupDialog),
      switchMap((action) =>
        this.store.select(selectGroupDialog(action.groupID)).pipe(
          take(1),
          filter((dialog) => !dialog),
          mergeMap((dialog) => {
            const params: IGroupDialogParams = { groupID: action.groupID };
            const since = dialog?.since;

            if (since) {
              params.since = since;
            }

            return this.groupService.loadGroupMessage(params).pipe(
              map((res: IGroupDialog) => {
                const groupDialog: IGroupDialog = {
                  ...res,
                  creatorID: action.creatorID,
                  groupName: action.groupName,
                };

                return GroupDialogActions.loadGroupDialogSuccess({
                  groupID: action.groupID,
                  groupDialog,
                });
              }),
              catchError((error) =>
                of(GroupDialogActions.loadGroupDialogFailure({ error }))
              )
            );
          })
        )
      )
    );
  });

  updateGroupMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupDialogActions.updateGroupDialog),
      switchMap((action) =>
        this.store.select(selectGroupDialog(action.groupID)).pipe(
          take(1),
          mergeMap((dialog) => {
            const params: IGroupDialogParams = {
              groupID: action.groupID,
              since: dialog?.since,
            };

            return this.groupService.loadGroupMessage(params).pipe(
              mergeMap((res: IGroupDialog) => [
                GroupDialogActions.updateGroupDialogSuccess({
                  groupID: action.groupID,
                  groupDialog: res,
                }),
                TimerActions.timerGroupDialogStart({
                  timeDuration: 60,
                }),
              ]),
              catchError((error) =>
                of(GroupDialogActions.updateGroupDialogFailure({ error }))
              )
            );
          })
        )
      )
    );
  });
}
