import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, timerFeatureKey } from '../reducers/timer.reducer';

const selectState = createFeatureSelector<State>(timerFeatureKey);

export const selectGroupTimer = createSelector(
  selectState,
  (state: State) => state.groupTimer
);
