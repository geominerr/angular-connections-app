import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, timerFeatureKey } from '../reducers/timer.reducer';

const selectState = createFeatureSelector<State>(timerFeatureKey);

export const selectGroupTimer = createSelector(
  selectState,
  (state: State) => state.groupTimer
);

export const selectUserTimer = createSelector(
  selectState,
  (state: State) => state.userTimer
);

export const selectTimerById = (id: string) =>
  createSelector(
    selectState,
    (state: State) => state?.timerMap?.[id]?.counter || null
  );
