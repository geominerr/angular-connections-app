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
    'Timer Group Dialog Start': props<{
      timeDuration: number;
    }>(),
    'Timer Group Dialog Update': emptyProps(),
    'Timer Group Dialog Stop': emptyProps(),
    'Timer Private Message Start': props<{
      timeDuration: number;
    }>(),
    'Timer Private Message Update': emptyProps(),
    'Timer Private Message Stop': emptyProps(),
  },
});
