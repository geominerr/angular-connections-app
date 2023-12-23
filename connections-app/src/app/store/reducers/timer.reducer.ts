import { createReducer, on } from '@ngrx/store';
import { TimerActions } from '../actions/timer.actions';

export const timerFeatureKey = 'timer';

export interface State {
  groupTimer: number;
  userTimer: number;
  timerMap: Record<string, { counter: number }>;
}

export const initialState: State = {
  groupTimer: 0,
  userTimer: 0,
  timerMap: {},
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
    TimerActions.timerStart,
    (state, { timeDuration, id }): State => ({
      ...state,
      timerMap: {
        ...state.timerMap,
        [id]: { counter: timeDuration },
      },
    })
  ),
  on(TimerActions.timerUpdate, (state, { id }): State => {
    const updatedTimerMap = {
      ...state.timerMap,
      [id]: { counter: state.timerMap[id].counter - 1 },
    };

    return {
      ...state,
      timerMap: updatedTimerMap,
    };
  }),
  on(TimerActions.timerStop, (state, { id }): State => {
    const { [id]: deletedTimer, ...otherTimers } = state.timerMap;

    return {
      ...state,
      timerMap: { ...otherTimers },
    };
  })
);
