import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { selectThemeValue } from './store/selectors/user.selectors';
import { StoreSaverService } from './core/services/store-saver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'connections-app';

  subscription!: Subscription;

  constructor(
    private storeSaver: StoreSaverService,
    private store: Store,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectThemeValue)
      .pipe(
        tap((darkTheme) => {
          if (darkTheme) {
            return this.renderer.addClass(document.body, 'dark-theme');
          }

          return this.renderer.removeClass(document.body, 'dark-theme');
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
