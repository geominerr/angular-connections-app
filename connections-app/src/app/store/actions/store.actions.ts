import { createActionGroup, emptyProps, props } from '@ngrx/store';

interface State {
  sendRequest: boolean;
  loginInfo: null | {
    token: string;
    uid: string;
    email: string;
  };
  userProfile: null | {
    email: string;
    name: string;
    uid: string;
    createdAt: string;
  };
}

export const StoreActions = createActionGroup({
  source: 'Store',
  events: {
    'Store Update': props<{ savedState: State }>(),
    'Store Change Theme': emptyProps(),
  },
});
