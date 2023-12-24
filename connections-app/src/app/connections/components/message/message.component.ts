import { NgIf, NgClass, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMessage } from '../../models/group-dialog.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgClass, DatePipe],
})
export class MessageComponent {
  @Input() itemData!: IMessage;
}
