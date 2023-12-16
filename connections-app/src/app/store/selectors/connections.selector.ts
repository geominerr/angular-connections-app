import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from '../reducers/user.reducer';

const selectState = createFeatureSelector<State>(userFeatureKey);

export const selectGroups = createSelector(
  selectState,
  (state: State) => state.groups
);
