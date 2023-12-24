import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { State } from 'src/app/store/reducers/user.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuardNotLogged {
  localStorageKey: string = '~_polymer_^<_^_>^_appState_~';

  constructor(private router: Router) {}

  canActivate: CanActivateFn = () => {
    const savedState: string | null = localStorage.getItem(
      this.localStorageKey
    );

    if (savedState) {
      const parsedState: State = JSON.parse(savedState);

      if (!parsedState?.loginInfo?.token) {
        this.router.navigate(['/signin']);

        return false;
      }
    }

    return true;
  };
}
