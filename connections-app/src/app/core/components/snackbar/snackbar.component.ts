import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Subscription, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  selectError,
  selectSuccessAction,
} from 'src/app/store/selectors/user.selectors';

import { ResponseMapperService } from '../../services/response-mapper.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  subscritpion!: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private store: Store,
    private mapper: ResponseMapperService
  ) {}

  ngOnInit(): void {
    this.subscritpion = this.store
      .select(selectError)
      .pipe(
        tap((error) => {
          if (error) {
            const message: string = this.mapper.getErrorMessage(error);

            this.snackBar.open(message, 'close', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }
        })
      )
      .subscribe();

    this.subscritpion.add(
      this.store
        .select(selectSuccessAction)
        .pipe(
          tap((action) => {
            if (action) {
              const message: string = this.mapper.getSuccessMessage(action);

              this.snackBar.open(message, 'close', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscritpion.unsubscribe();
  }
}
