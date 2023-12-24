import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';
import { ConversationComponent } from '../../components/conversation/conversation.component';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConversationComponent],
})
export class ConversationPageComponent implements OnInit {
  conversationID: string | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.conversationID = this.route.snapshot.paramMap.get('id');

    if (this.conversationID) {
      this.store.dispatch(
        ConversationActions.getConversationMessage({
          conversationID: this.conversationID,
        })
      );
    }
  }
}
