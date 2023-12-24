import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { interval, switchMap, map, takeUntil, mergeMap, filter } from 'rxjs';
import { TimerActions } from '../actions/timer.actions';

@Injectable()
export class TimerEffects {
  constructor(private actions$: Actions) {}

  startGroupTimer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TimerActions.timerGroupStart),
      switchMap((action) => {
        let startTime: number = action.timeDuration;

        return interval(1000).pipe(
          map(() => {
            if (startTime > 0) {
              startTime -= 1;

              return TimerActions.timerGroupUpdate();
            }

            return TimerActions.timerGroupStop();
          }),
          takeUntil(this.actions$.pipe(ofType(TimerActions.timerGroupStop)))
        );
      })
    );
  });

  startUserTimer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TimerActions.timerUserStart),
      switchMap((action) => {
        let startTime: number = action.timeDuration;

        return interval(1000).pipe(
          map(() => {
            if (startTime > 0) {
              startTime -= 1;

              return TimerActions.timerUserUpdate();
            }

            return TimerActions.timerUserStop();
          }),
          takeUntil(this.actions$.pipe(ofType(TimerActions.timerUserStop)))
        );
      })
    );
  });

  startIndependentTimer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TimerActions.timerStart),
      mergeMap((action) => {
        let startTime: number = action.timeDuration;

        return interval(1000).pipe(
          map(() => {
            if (startTime > 0) {
              startTime -= 1;

              return TimerActions.timerUpdate({ id: action.id });
            }

            return TimerActions.timerStop({ id: action.id });
          }),
          takeUntil(
            this.actions$.pipe(
              ofType(TimerActions.timerStop),
              filter((actionStop) => actionStop.id === action.id)
            )
          )
        );
      })
    );
  });
}
