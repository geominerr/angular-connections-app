import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/store/actions/user.actions';
import {
  selectSendRequest,
  selectSigninNotFoundError,
} from 'src/app/store/selectors/user.selectors';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Observable, Subscription, tap } from 'rxjs';

import { ILoginData } from '../../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class SigninComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  isRequest$!: Observable<boolean>;

  form!: FormGroup;

  hide: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isRequest$ = this.store.select(selectSendRequest);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.subscription = this.store
      .select(selectSigninNotFoundError)
      .pipe(
        tap((signinError) => {
          if (signinError) {
            const { email, password } = this.form.controls;

            if (signinError) {
              email.setErrors({
                notFound: true,
              });
              password.setErrors({
                notFound: true,
              });
              this.form.updateValueAndValidity();
            }
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleHidePassword(e: Event): void {
    e.preventDefault();

    this.hide = !this.hide;
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const loginData: ILoginData = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };

    this.store.dispatch(UserActions.userSignin({ loginData }));
  }

  getEmailValidationError(): string | null {
    const { email } = this.form.controls;

    if (email.hasError('required')) {
      return 'This is required field';
    }

    if (email.hasError('email')) {
      return 'The email is invalid';
    }

    if (email.hasError('notFound')) {
      return 'User with this email and password not found';
    }

    return null;
  }

  getPasswordValidationError(): string | null {
    const { password } = this.form.controls;

    if (password.hasError('required')) {
      return 'This is required field';
    }

    if (password.hasError('notFound')) {
      return 'User with this email and password not found';
    }

    return null;
  }

  redirectToSignup(e: Event): void {
    e.preventDefault();

    this.router.navigate(['/signup']);
  }
}
