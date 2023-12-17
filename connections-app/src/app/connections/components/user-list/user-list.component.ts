import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';
import { selectUserTimer } from 'src/app/store/selectors/timer.selectors';
import { selectUserListNew } from 'src/app/store/selectors/connections.selector';
import { selectThemeValue } from 'src/app/store/selectors/user.selectors';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { UserListItemComponent } from '../user-list-item/user-list-item.component';
import { IUserItemWithConversation } from '../../models/connections.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    UserListItemComponent,
  ],
})
export class UserListComponent implements OnInit {
  users$!: Observable<null | IUserItemWithConversation[]>;

  darkMode$!: Observable<boolean>;

  timer$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ConversationActions.loadUsers());
    this.users$ = this.store.select(selectUserListNew);
    this.darkMode$ = this.store.select(selectThemeValue);
    this.timer$ = this.store.select(selectUserTimer);
  }

  updateUserList(): void {
    this.store.dispatch(ConversationActions.updateUsers());
  }
}
