import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TimerActions = createActionGroup({
  source: 'Timer',
  events: {
    'Timer Group Start': props<{ timeDuration: number }>(),
    'Timer Group Update': emptyProps(),
    'Timer Group Stop': emptyProps(),
    'Timer User Start': props<{ timeDuration: number }>(),
    'Timer User Update': emptyProps(),
    'Timer User Stop': emptyProps(),
    'Timer Start': props<{ timeDuration: number; id: string }>(),
    'Timer Update': props<{ id: string }>(),
    'Timer Stop': props<{ id: string }>(),
  },
});
