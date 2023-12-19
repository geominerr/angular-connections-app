import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/reducers/user.reducer';
import { State as GroupDialogState } from 'src/app/store/reducers/group-dialog.reducer';
import { State as ConversationState } from 'src/app/store/reducers/conversation.reducer';
import { StoreActions } from 'src/app/store/actions/store.actions';
import { selectGeneralState } from 'src/app/store/selectors/user.selectors';
import { selectAllGroupDialogs } from 'src/app/store/selectors/group-dialog.selectors';
import { selectAllConversations } from 'src/app/store/selectors/conversation.selectors';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreSaverService {
  counter: number = 0;

  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  localStorageKeyGroupDialog: string = '~_polymer_^<_^_>^_groupDialogs_~';

  localStorageKeyConversation: string = '~_polymer_^<_^_>^_conversations_~';

  constructor(private store: Store) {
    const savedState: string | null = localStorage.getItem(
      this.localStorageKey
    );
    const savedDialogs: string | null = localStorage.getItem(
      this.localStorageKeyGroupDialog
    );
    const savedConversations: string | null = localStorage.getItem(
      this.localStorageKeyConversation
    );

    if (savedState) {
      const parsedState: State = JSON.parse(savedState);
      this.store.dispatch(
        StoreActions.storeUpdate({ savedState: parsedState })
      );
    }

    if (savedDialogs) {
      const parsedState: GroupDialogState = JSON.parse(savedDialogs);
      this.store.dispatch(
        StoreActions.storeUpdateDialogs({ savedDialogs: parsedState })
      );
    }

    if (savedConversations) {
      const parsedState: ConversationState = JSON.parse(savedConversations);
      this.store.dispatch(
        StoreActions.storeUpdateConversations({
          savedConversations: parsedState,
        })
      );
    }

    this.store
      .select(selectGeneralState)
      .pipe(
        tap((state: State) => {
          if (state?.successAction === 'logout') {
            localStorage.clear();
          }

          return localStorage.setItem(
            this.localStorageKey,
            JSON.stringify({
              userNames: state.userNames,
              loginInfo: state.loginInfo,
              darkTheme: state.darkTheme,
            })
          );
        })
      )
      .subscribe();

    this.store
      .select(selectAllGroupDialogs)
      .pipe(
        tap((state: GroupDialogState) => {
          if (state.groupDialogs) {
            localStorage.setItem(
              this.localStorageKeyGroupDialog,
              JSON.stringify(state)
            );
          }
        })
      )
      .subscribe();

    this.store
      .select(selectAllConversations)
      .pipe(
        tap((state) => {
          if (state?.conversations) {
            localStorage.setItem(
              this.localStorageKeyConversation,
              JSON.stringify(state)
            );
          }
        })
      )
      .subscribe();
  }
}
