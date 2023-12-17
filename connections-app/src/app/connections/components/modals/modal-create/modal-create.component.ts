import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/store/actions/groups.action';
import { selectSuccessAction } from 'src/app/store/selectors/user.selectors';

import { Subscription, tap } from 'rxjs';

import { groupNameValidator } from 'src/app/connections/utils/group-name-validator.util';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ModalCreateComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  subscription!: Subscription;

  constructor(
    private dialogRef: MatDialogRef<ModalCreateComponent>,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      groupName: ['', [groupNameValidator]],
    });

    this.subscription = this.store
      .select(selectSuccessAction)
      .pipe(
        tap((action) => {
          if (action === 'groupCreate') {
            this.dialogRef.close();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getErrorMessage(): string | null {
    if (this.form.controls['groupName'].hasError('groupName')) {
      return this.form.controls['groupName'].getError('groupName');
    }

    return null;
  }

  createGroup(): void {
    if (this.form.invalid) {
      return;
    }
    const name: string = this.form.controls['groupName'].value;

    this.store.dispatch(GroupActions.groupCreate({ name }));
  }
}
