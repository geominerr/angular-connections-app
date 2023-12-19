import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { GroupDialogActions } from 'src/app/store/actions/group-dialog.actions';
import { selectGroupDialogTimer } from 'src/app/store/selectors/timer.selectors';
import { selectGroupDialog } from 'src/app/store/selectors/group-dialog.selectors';
import { selectUserId } from 'src/app/store/selectors/user.selectors';
import { IGroupDialogConverted } from '../../models/group-dialog.model';

import { ModalService } from '../../services/modal.service';
import { MessageComponent } from '../message/message.component';
import { InputMessageComponent } from '../input-message/input-message.component';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MessageComponent,
    InputMessageComponent,
    RouterModule,
  ],
})
export class GroupDialogComponent implements OnInit {
  groupID: string | null = null;

  timer$: Observable<number> | null = null;

  groupDialog$!: Observable<IGroupDialogConverted | null>;

  userID$!: Observable<string | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.groupID = this.route.snapshot.paramMap.get('id');
    this.userID$ = this.store.select(selectUserId);

    if (this.groupID) {
      this.timer$ = this.store.select(selectGroupDialogTimer);
      this.groupDialog$ = this.store.select(selectGroupDialog(this.groupID));
    }
  }

  updateGroupDialog(): void {
    if (this.groupID) {
      this.store.dispatch(
        GroupDialogActions.updateGroupDialog({ groupID: this.groupID })
      );
    }
  }

  openModal(): void {
    if (this.groupID) {
      this.modalService.openRemoveGroupDialog({ groupID: this.groupID });
    }
  }
}
