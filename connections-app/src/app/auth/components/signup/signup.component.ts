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
  selectSignupExistUserError,
} from 'src/app/store/selectors/user.selectors';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable, Subscription, tap } from 'rxjs';

import { IUser } from '../../models/user.model';
import { passwordValidator } from '../../utils/password-validator.util';
import { usernameValidator } from '../../utils/username-vaidator';
import { existEmailValidator } from '../../utils/email-validator.util';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  isRequest$!: Observable<boolean>;

  form!: FormGroup;

  hide: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isRequest$ = this.store.select(selectSendRequest);

    this.form = this.fb.group({
      username: ['', [Validators.required, usernameValidator]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          existEmailValidator(this.authService.existEmails),
        ],
        [],
      ],
      password: ['', [Validators.required, passwordValidator]],
    });

    this.subscription = this.store
      .select(selectSignupExistUserError)
      .pipe(
        tap((error) => {
          if (error) {
            const { email } = this.form.controls;
            email.setErrors({
              existEmail: true,
            });
            email.updateValueAndValidity();
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

    const user: IUser = {
      name: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };

    this.store.dispatch(UserActions.userSignup({ userData: user }));
  }

  getUsernameValidationError(): string | null {
    const { username } = this.form.controls;

    return username.getError('username');
  }

  getEmailValidationError(): string | null {
    const { email } = this.form.controls;

    if (email.hasError('required')) {
      return 'This is required field';
    }

    if (email.hasError('email')) {
      return 'The email is invalid';
    }

    if (email.hasError('existEmail')) {
      return 'A user with this email already exists';
    }

    return null;
  }

  getPasswordValidationError(): string | null {
    const { password } = this.form.controls;

    return password.getError('strength');
  }

  redirectToSignin(e: Event): void {
    e.preventDefault();

    this.router.navigate(['/signin']);
  }
}
