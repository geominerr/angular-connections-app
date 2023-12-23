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
import { IConversationMessageRequestQuery } from 'src/app/connections/models/conversation.model';
import { ConversationService } from 'src/app/connections/services/conversation.service';
import { ConversationActions } from '../actions/conversation.actions';
import { TimerActions } from '../actions/timer.actions';
import { selectUserList } from '../selectors/connections.selector';
import {
  selectAllConversationsMap,
  selectConversations,
} from '../selectors/conversation.selectors';

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
          take(1),
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

  getConversationMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.getConversationMessage),
      switchMap((action) =>
        this.store.select(selectAllConversationsMap).pipe(
          take(1),
          mergeMap((conversation) => {
            const params: IConversationMessageRequestQuery = {
              conversationID: action.conversationID,
            };
            const since = conversation?.[action.conversationID]?.since;

            if (since) {
              params.since = since;
            }

            return this.conversationService
              .getConversationMessages(params)
              .pipe(
                map((res) =>
                  ConversationActions.getConversationMessageSuccess({
                    conversationID: action.conversationID,
                    ...res,
                  })
                ),
                catchError((error) =>
                  of(
                    ConversationActions.getConversationMessageFailure({
                      error,
                    })
                  )
                )
              );
          }),
          catchError((error) =>
            of(
              ConversationActions.getConversationMessageFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.sendMessage),
      switchMap((action) =>
        this.conversationService
          .sendConversationMessages({
            conversationID: action.conversationID,
            message: action.message,
          })
          .pipe(
            map(() =>
              ConversationActions.sendMessageSuccess({
                conversationID: action.conversationID,
              })
            ),
            catchError((error) =>
              of(ConversationActions.createConversationFailure({ error }))
            )
          )
      )
    );
  });

  reloadMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.sendMessageSuccess),
      map((action) =>
        ConversationActions.getConversationMessage({
          conversationID: action.conversationID,
        })
      )
    );
  });

  updateConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.updateConversation),
      mergeMap((action) => [
        ConversationActions.getConversationMessage({
          conversationID: action.conversationID,
        }),
        TimerActions.timerStart({
          timeDuration: 60,
          id: action.conversationID,
        }),
      ])
    );
  });

  removeConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationActions.removeConversation),
      switchMap((action) =>
        this.conversationService.deleteConversation(action.conversationID).pipe(
          map(() =>
            ConversationActions.removeConversationSuccess({
              conversationID: action.conversationID,
            })
          ),
          catchError((error) =>
            of(ConversationActions.removeConversationFailure({ error }))
          )
        )
      )
    );
  });

  redirectToMainPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConversationActions.removeConversationSuccess),
        tap(() => this.router.navigate(['/']))
      );
    },
    { dispatch: false }
  );
}
