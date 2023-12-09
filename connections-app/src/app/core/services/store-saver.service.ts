import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/reducers/user.reducer';
import { StoreActions } from 'src/app/store/actions/store.actions';
import { selectGeneralState } from 'src/app/store/selectors/user.selectors';

import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreSaverService {
  counter: number = 0;

  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  constructor(private store: Store) {
    console.log('StoreSaverService');
    const savedState: string | null = localStorage.getItem(
      this.localStorageKey
    );

    if (savedState) {
      const parsedState: State = JSON.parse(savedState);
      this.store.dispatch(
        StoreActions.storeUpdate({ savedState: parsedState })
      );
    }

    this.store
      .select(selectGeneralState)
      .pipe(
        tap((state: State) => {
          console.log('State changed ', (this.counter += 1));
          localStorage.setItem(this.localStorageKey, JSON.stringify(state));
        })
      )
      .subscribe();
  }
}
