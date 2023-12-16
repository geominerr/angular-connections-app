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
import { GroupActions } from 'src/app/store/actions/groups.action';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
})
export class ModalRemoveComponent implements OnInit {
  groupID!: string;

  groupName!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { groupID: string; name: string },
    private dialogRef: MatDialogRef<ModalRemoveComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.groupID = this.data.groupID;
    this.groupName = this.data.name;
  }

  removeGroup(): void {
    this.store.dispatch(GroupActions.groupRemove({ groupID: this.groupID }));
    this.dialogRef.close();
  }
}
