import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Store } from '@ngrx/store';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';

@Component({
  selector: 'app-modal-remove-conversation',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
})
export class ModalRemoveConversationComponent implements OnInit {
  conversationID!: string;

  groupName: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { conversationID: string; name: string },
    private dialogRef: MatDialogRef<ModalRemoveConversationComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.conversationID = this.data.conversationID;
    this.groupName = this.data.name;
  }

  removeGroup(): void {
    this.store.dispatch(
      ConversationActions.removeConversation({
        conversationID: this.conversationID,
      })
    );
    this.dialogRef.close();
  }
}
