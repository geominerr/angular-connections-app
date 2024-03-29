import { NgModule, isDevMode } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducers/user.reducer';
import { timerReducer } from './reducers/timer.reducer';
import { groupDialogReducer } from './reducers/group-dialog.reducer';
import { conversationReducer } from './reducers/conversation.reducer';

import { UserEffects } from './effects/user.effects';
import { ProfileEffects } from './effects/profile.effects';
import { GroupEffects } from './effects/group.effects';
import { TimerEffects } from './effects/timer.effects';
import { ConversationEffects } from './effects/conversation.effects';
import { GroupDialogEffects } from './effects/group-dialog.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({
      user: reducer,
      timer: timerReducer,
      groupDialog: groupDialogReducer,
      conversation: conversationReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      ProfileEffects,
      GroupEffects,
      TimerEffects,
      ConversationEffects,
      GroupDialogEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
})
export class StoreAppModule {}
