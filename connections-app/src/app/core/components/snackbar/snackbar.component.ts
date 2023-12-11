import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Subscription, skip, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  selectExistingEmails,
  selectCreatedFlag,
  selectSigninError,
  selectLoggedFlag,
  selectUserName,
  selectEditProfileError,
} from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  standalone: true,
  imports: [MatSnackBarModule],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  subscritpion!: Subscription;

  constructor(private snackBar: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.subscritpion = this.store
      .select(selectExistingEmails)
      .pipe(
        tap((existingEmails) => {
          if (existingEmails.length) {
            this.snackBar.open(
              `A user with email: ${
                existingEmails.slice(-1)[0]
              } already exists`,
              'close',
              { duration: 3000, panelClass: ['red-snackbar'] }
            );
          }
        })
      )
      .subscribe();

    this.subscritpion.add(
      this.store
        .select(selectCreatedFlag)
        .pipe(
          tap((isCreated) => {
            if (isCreated) {
              this.snackBar.open('User successfully created', 'close', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
            }
          })
        )
        .subscribe()
    );

    this.subscritpion.add(
      this.store
        .select(selectSigninError)
        .pipe(
          tap((isCreated) => {
            if (isCreated) {
              this.snackBar.open(
                'User with this email and password not found',
                'close',
                {
                  duration: 3000,
                  panelClass: ['red-snackbar'],
                }
              );
            }
          })
        )
        .subscribe()
    );

    this.subscritpion.add(
      this.store
        .select(selectLoggedFlag)
        .pipe(
          tap((isLogged) => {
            if (isLogged) {
              this.snackBar.open('Login successful. Welcome back!', 'close', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
            }
          })
        )
        .subscribe()
    );

    this.subscritpion.add(
      this.store
        .select(selectUserName)
        .pipe(
          skip(1),
          tap((userName) => {
            if (userName) {
              this.snackBar.open(
                `Username successfully changed to ${userName}`,
                'close',
                {
                  duration: 3000,
                  panelClass: ['green-snackbar'],
                }
              );
            }
          })
        )
        .subscribe()
    );

    this.subscritpion.add(
      this.store
        .select(selectEditProfileError)
        .pipe(
          tap((err) => {
            if (err) {
              this.snackBar.open(
                'Username has not been changed there was a connection error, try later please',
                'close',
                {
                  duration: 3500,
                  panelClass: ['red-snackbar'],
                }
              );
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
