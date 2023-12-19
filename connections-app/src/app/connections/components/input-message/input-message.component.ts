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
import { Store } from '@ngrx/store';
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
  ],
})
export class InputMessageComponent implements OnInit {
  @Input() userID!: string | null | undefined;

  @Input() groupID!: string | null;

  form!: FormGroup;

  constructor(private store: Store, private groupService: ConnectionsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  sendMessage(): void {
    const message1: string = this.form.controls['message'].value;
    console.log(this.groupID, this.userID);
    this.groupService
      .sendMessage({ message: message1, groupID: this.groupID as string })
      .subscribe();
    console.log(message1);
  }
}
