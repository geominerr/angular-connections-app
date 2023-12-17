import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

import { Store } from '@ngrx/store';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { IUserItemWithConversation } from '../../models/connections.model';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgClass, MatIconModule, MatListModule, MatButtonModule],
})
export class UserListItemComponent implements OnInit {
  @Input() itemData!: IUserItemWithConversation;

  conversationID: string | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.conversationID = this.itemData.conversationID;
  }

  navigateToConversationPage(): void {
    console.log(this.itemData.name);
    this.store.dispatch(
      ConversationActions.openConversation({ companionID: this.itemData.uid })
    );
  }
}
