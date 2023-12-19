import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectConversationByID } from 'src/app/store/selectors/conversation.selectors';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';
import { selectPrivateMessageTimer } from 'src/app/store/selectors/timer.selectors';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { ModalService } from '../../services/modal.service';
import { MessageComponent } from '../message/message.component';
import { InputMessageComponent } from '../input-message/input-message.component';
import { IMessage } from '../../models/group-dialog.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MessageComponent,
    InputMessageComponent,
  ],
})
export class ConversationComponent implements OnInit {
  conversationID: string | null = null;

  timer$: Observable<number> | null = null;

  conversation$!: Observable<IMessage[] | null>;

  userID$!: Observable<string | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.conversationID = this.route.snapshot.paramMap.get('id');
    this.timer$ = this.store.select(selectPrivateMessageTimer);

    if (this.conversationID) {
      this.conversation$ = this.store.select(
        selectConversationByID(this.conversationID)
      );
    }
  }

  updateConversation(): void {
    if (this.conversationID) {
      this.store.dispatch(
        ConversationActions.updateConversation({
          conversationID: this.conversationID,
        })
      );
    }
  }

  removeConversation(): void {
    if (this.conversationID) {
      this.modal.openRemoveConversationDialog({
        conversationID: this.conversationID,
      });
    }
  }
}
