import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, userFeatureKey } from '../reducers/user.reducer';

const selectAuthState = createFeatureSelector<State>(userFeatureKey);

export const selectUserState = createSelector(
  selectAuthState,
  (state: State) => {
    console.log(state);
    return state;
  }
);

export const selectSendRequest = createSelector(
  selectAuthState,
  (state: State) => state.sendRequest
);

export const selectCreatedFlag = createSelector(
  selectAuthState,
  (state: State) => state.isCreated
);

export const selectLoggedFlag = createSelector(
  selectAuthState,
  (state: State) => state.isLogged
);

export const selectExistingEmails = createSelector(
  selectAuthState,
  (state: State) => state.existingEmails
);

export const selectSigninError = createSelector(
  selectAuthState,
  (state: State) => state.signinError
);

export const selectGeneralState = createSelector(
  selectAuthState,
  (state: State) => state
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state: State) => {
    if (state.loginInfo?.token) {
      return true;
    }

    return false;
  }
);
