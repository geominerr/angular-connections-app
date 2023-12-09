import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ user: reducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
})
export class StoreAppModule {}
