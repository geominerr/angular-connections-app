import { createReducer, on } from '@ngrx/store';
import { TimerActions } from '../actions/timer.actions';

export const timerFeatureKey = 'timer';

export interface State {
  groupTimer: number;
  userTimer: number;
  groupDialogTimer: number;
  privateMessageTimer: number;
}

export const initialState: State = {
  groupTimer: 0,
  userTimer: 0,
  groupDialogTimer: 0,
  privateMessageTimer: 0,
};

export const timerReducer = createReducer(
  initialState,
  on(
    TimerActions.timerGroupStart,
    (state): State => ({
      ...state,
      groupTimer: 60,
    })
  ),
  on(
    TimerActions.timerGroupUpdate,
    (state): State => ({
      ...state,
      groupTimer: state.groupTimer - 1,
    })
  ),
  on(
    TimerActions.timerGroupStop,
    (state): State => ({
      ...state,
      groupTimer: 0,
    })
  ),
  on(
    TimerActions.timerUserStart,
    (state): State => ({
      ...state,
      userTimer: 60,
    })
  ),
  on(
    TimerActions.timerUserUpdate,
    (state): State => ({
      ...state,
      userTimer: state.userTimer - 1,
    })
  ),
  on(
    TimerActions.timerUserStop,
    (state): State => ({
      ...state,
      userTimer: 0,
    })
  ),
  on(
    TimerActions.timerGroupDialogStart,
    (state, { timeDuration }): State => ({
      ...state,
      groupDialogTimer: timeDuration,
    })
  ),
  on(
    TimerActions.timerGroupDialogUpdate,
    (state): State => ({
      ...state,
      groupDialogTimer: state.groupDialogTimer - 1,
    })
  ),
  on(
    TimerActions.timerGroupDialogStop,
    (state): State => ({
      ...state,
      groupDialogTimer: 0,
    })
  ),
  on(
    TimerActions.timerPrivateMessageStart,
    (state, { timeDuration }): State => ({
      ...state,
      privateMessageTimer: timeDuration,
    })
  ),
  on(
    TimerActions.timerPrivateMessageUpdate,
    (state): State => ({
      ...state,
      privateMessageTimer: state.privateMessageTimer - 1,
    })
  ),
  on(
    TimerActions.timerPrivateMessageStop,
    (state): State => ({
      ...state,
      privateMessageTimer: 0,
    })
  )
);
