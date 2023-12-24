import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GroupDialogComponent } from '../../components/group-dialog/group-dialog.component';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupDialogComponent],
})
export class DialogPageComponent {}
