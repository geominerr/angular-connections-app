import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  switchMap,
  map,
  catchError,
  of,
  concat,
  mergeMap,
  take,
  filter,
  merge,
  tap,
} from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConversationService } from 'src/app/connections/services/conversation.service';
import { ConversationActions } from '../actions/conversation.actions';
import { TimerActions } from '../actions/timer.actions';
import {
  selectConversations,
  selectUserList,
} from '../selectors/connections.selector';

@Injectable()
export class ConversationEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private conversationService: ConversationService
  ) {}

  loadUserList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.loadUsers),
      switchMap(() =>
        this.store.select(selectUserList).pipe(
          take(1),
          filter((userList) => !userList),
          switchMap(() =>
            this.conversationService.getUserList().pipe(
              mergeMap((items) =>
                concat(
                  of(ConversationActions.loadUsersSuccess({ users: items })),
                  of(ConversationActions.loadConversation())
                )
              ),
              catchError((error) =>
                of(ConversationActions.loadUsersFailure({ error }))
              )
            )
          )
        )
      )
    );
  });

  loadConversations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.loadConversation),
      switchMap(() =>
        this.conversationService.getConversationsList().pipe(
          map((res) =>
            ConversationActions.loadConversationSuccess({
              conversations: res,
            })
          ),
          catchError((error) =>
            of(ConversationActions.loadConversationFailure({ error }))
          )
        )
      )
    );
  });

  updateUserList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.updateUsers),
      switchMap(() =>
        this.conversationService.getUserList().pipe(
          mergeMap((items) =>
            concat(
              of(ConversationActions.updateUsersSuccess({ users: items })),
              of(TimerActions.timerUserStart({ timeDuration: 60 }))
            )
          ),
          catchError((error) =>
            of(ConversationActions.updateUsersFailure({ error }))
          )
        )
      )
    );
  });

  openConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.openConversation),
      switchMap((action) =>
        this.store.select(selectConversations).pipe(
          map((conversation) => {
            const companionID = action.companionID;
            const conversationID = conversation?.[companionID]?.conversationID;

            if (conversationID) {
              return ConversationActions.openConversationSuccess({
                companionID,
                id: conversationID,
              });
            }

            return ConversationActions.createConversation({ companionID });
          }),
          catchError((error) =>
            of(ConversationActions.createConversationFailure({ error }))
          )
        )
      )
    );
  });

  createConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.createConversation),
      switchMap((action) =>
        this.conversationService.createConversation(action.companionID).pipe(
          map((id) =>
            ConversationActions.createConversationSuccess({
              companionID: action.companionID,
              id,
            })
          ),
          catchError((error) =>
            of(ConversationActions.createConversationFailure({ error }))
          )
        )
      )
    );
  });

  redirectToConversationPage$ = createEffect(
    () => {
      return merge(
        this.actions$.pipe(ofType(ConversationActions.openConversationSuccess)),
        this.actions$.pipe(
          ofType(ConversationActions.createConversationSuccess)
        )
      ).pipe(
        tap((action) => this.router.navigate(['/conversation', action.id]))
      );
    },
    { dispatch: false }
  );
}
