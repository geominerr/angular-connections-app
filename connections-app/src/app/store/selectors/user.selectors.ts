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

export const selectSignupExistUserError = createSelector(
  selectAuthState,
  (state: State) => {
    if (
      state.error?.action === 'signup' &&
      state.error?.error?.type === 'PrimaryDuplicationException'
    ) {
      return true;
    }

    return false;
  }
);

export const selectSigninNotFoundError = createSelector(
  selectAuthState,
  (state: State) => {
    if (
      state.error?.action === 'signin' &&
      state.error?.error?.type === 'NotFoundException'
    ) {
      return true;
    }

    return false;
  }
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

export const selectUserProfile = createSelector(
  selectAuthState,
  (state: State) => state.userProfile
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: State) => state.userProfile?.name
);

export const selectError = createSelector(
  selectAuthState,
  (state: State) => state.error
);

export const selectSuccessAction = createSelector(
  selectAuthState,
  (state: State) => state.successAction
);

export const selectThemeValue = createSelector(
  selectAuthState,
  (state: State) => state.darkTheme
);
