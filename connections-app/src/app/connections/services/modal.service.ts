import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateComponent } from '../components/modals/modal-create/modal-create.component';
import { ModalRemoveComponent } from '../components/modals/modal-remove/modal-remove.component';
import { ModalRemoveConversationComponent } from '../components/modals/modal-remove-conversation/modal-remove.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private matDialog: MatDialog) {}

  openCreateGroupDialog(): void {
    this.matDialog.open(ModalCreateComponent);
  }

  openRemoveGroupDialog(data: { groupID: string; name?: string }): void {
    this.matDialog.open(ModalRemoveComponent, { data });
  }

  openRemoveConversationDialog(data: {
    conversationID: string;
    name?: string;
  }): void {
    this.matDialog.open(ModalRemoveConversationComponent, { data });
  }
}
