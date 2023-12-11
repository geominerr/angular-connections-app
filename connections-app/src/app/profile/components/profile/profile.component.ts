import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgIf, NgClass, AsyncPipe, DatePipe } from '@angular/common';

import { Store } from '@ngrx/store';
import {
  selectSendRequest,
  selectUserName,
} from 'src/app/store/selectors/user.selectors';
import { ProfileActions } from 'src/app/store/actions/profile.actions';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Observable, Subscription, tap } from 'rxjs';
import { usernameValidator } from 'src/app/auth/utils/username-vaidator';
import { IUserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgClass,
    AsyncPipe,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() userInfo!: IUserProfile;

  subscription!: Subscription;

  isRequest$!: Observable<boolean>;

  form!: FormGroup;

  editMode: boolean = false;

  prevName: string = '';

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isRequest$ = this.store.select(selectSendRequest);

    this.prevName = this.userInfo?.name;

    this.form = this.fb.group({
      email: [{ value: this.userInfo?.email, disabled: true }],
      username: [
        { value: this.userInfo?.name, disabled: true },
        [usernameValidator],
      ],
      uid: [{ value: this.userInfo?.uid, disabled: true }],
      createDate: [{ value: this.userInfo?.createdAt, disabled: true }],
    });

    this.subscription = this.store
      .select(selectUserName)
      .pipe(
        tap((name: string | undefined) => {
          if (name) {
            this.prevName = name;
            this.disableEditMode();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    const userName = this.form.controls['username'].value;

    this.store.dispatch(ProfileActions.profileUpdate({ userName }));
  }

  disableEditMode(): void {
    const { username } = this.form.controls;

    username.setValue(this.prevName);
    username.disable();
    this.editMode = false;
  }

  enableEditMode(): void {
    const { username } = this.form.controls;

    username.enable();
    username.markAsTouched();
    this.editMode = true;
  }

  getUsernameValidationError(): string | null {
    const { username } = this.form.controls;

    return username.getError('username');
  }
}
