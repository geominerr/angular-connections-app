import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/store/actions/groups.action';
import { selectGroupTimer } from 'src/app/store/selectors/timer.selectors';
import { selectGroups } from 'src/app/store/selectors/connections.selector';
import {
  selectThemeValue,
  selectUserId,
} from 'src/app/store/selectors/user.selectors';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { ModalService } from '../../services/modal.service';
import { GroupListItemComponent } from '../group-list-item/group-list-item.component';
import { IGroupItem } from '../../models/connections.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    GroupListItemComponent,
  ],
})
export class GroupListComponent implements OnInit {
  groups$!: Observable<null | IGroupItem[]>;

  darkMode$!: Observable<boolean>;

  userID$!: Observable<string | undefined>;

  timer$!: Observable<number>;

  constructor(private store: Store, private modalService: ModalService) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(selectGroups);
    this.darkMode$ = this.store.select(selectThemeValue);
    this.userID$ = this.store.select(selectUserId);
    this.timer$ = this.store.select(selectGroupTimer);
  }

  openModal(): void {
    this.modalService.openCreateGroupDialog();
  }

  updateGroupList(): void {
    this.store.dispatch(GroupActions.groupUpdate());
  }
}
