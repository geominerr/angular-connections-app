import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { ProfileEffects } from './effects/profile.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ user: reducer }),
    EffectsModule.forRoot([UserEffects, ProfileEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class StoreAppModule {}
