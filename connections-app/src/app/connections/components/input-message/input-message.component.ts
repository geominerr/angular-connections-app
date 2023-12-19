import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Store } from '@ngrx/store';
import { ConversationActions } from 'src/app/store/actions/conversation.actions';
import { GroupDialogActions } from 'src/app/store/actions/group-dialog.actions';
import { ConnectionsService } from '../../services/group.service';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class InputMessageComponent implements OnInit {
  @Input() userID!: string | null | undefined;

  @Input() groupID: string | null = null;

  @Input() conversationID: string | null = null;

  @Input() typeInput: 'group' | 'private' = 'group';

  form!: FormGroup;

  constructor(private store: Store, private groupService: ConnectionsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  sendMessage(): void {
    const message: string = this.form.controls['message'].value;

    if (this.groupID) {
      this.store.dispatch(
        GroupDialogActions.sendMessage({ groupID: this.groupID, message })
      );
    }

    if (this.conversationID) {
      this.store.dispatch(
        ConversationActions.sendMessage({
          conversationID: this.conversationID,
          message,
        })
      );
    }

    this.form.reset();
  }
}
