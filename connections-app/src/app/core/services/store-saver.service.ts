import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/reducers/user.reducer';
import { State as GroupDialogState } from 'src/app/store/reducers/group-dialog.reducer';
import { StoreActions } from 'src/app/store/actions/store.actions';
import { selectGeneralState } from 'src/app/store/selectors/user.selectors';

import { tap } from 'rxjs';
import { selectAllGroupDialogs } from 'src/app/store/selectors/group-dialog.selectors';

@Injectable({
  providedIn: 'root',
})
export class StoreSaverService {
  counter: number = 0;

  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  localStorageKeyGroupDialog: string = '~_polymer_^<_^_>^_groupDialogs_~';

  constructor(private store: Store) {
    console.log('StoreSaverService');
    const savedState: string | null = localStorage.getItem(
      this.localStorageKey
    );
    const savedDialogs: string | null = localStorage.getItem(
      this.localStorageKeyGroupDialog
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

    this.store
      .select(selectGeneralState)
      .pipe(
        tap((state: State) => {
          console.log('State changed ', (this.counter += 1), state);
          if (state?.successAction === 'logout') {
            localStorage.clear();
          }

          return localStorage.setItem(
            this.localStorageKey,
            JSON.stringify(state)
          );
        })
      )
      .subscribe();

    this.store
      .select(selectAllGroupDialogs)
      .pipe(
        tap((state: GroupDialogState) =>
          localStorage.setItem(
            this.localStorageKeyGroupDialog,
            JSON.stringify(state)
          )
        )
      )
      .subscribe();
  }
}
