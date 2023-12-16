import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers/user.reducer';
import { timerReducer } from './reducers/timer.reducer';
import { UserEffects } from './effects/user.effects';
import { ProfileEffects } from './effects/profile.effects';
import { GroupEffects } from './effects/group.effects';
import { TimerEffects } from './effects/timer.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ user: reducer, timer: timerReducer }),
    EffectsModule.forRoot([
      UserEffects,
      ProfileEffects,
      GroupEffects,
      TimerEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class StoreAppModule {}
