import { createActionGroup, props } from '@ngrx/store';

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
  isCreated: boolean;
  isLogged: boolean;
  existingEmails: string[];
}

export const StoreActions = createActionGroup({
  source: 'Store',
  events: {
    'Store Update': props<{ savedState: State }>(),
  },
});
