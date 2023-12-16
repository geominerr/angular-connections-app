import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { IGroupItem } from '../../models/connections.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-group-list-item',
  templateUrl: './group-list-item.component.html',
  styleUrls: ['./group-list-item.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, MatIconModule, MatListModule, MatButtonModule],
})
export class GroupListItemComponent implements OnInit {
  @Input() itemData!: IGroupItem;

  @Input() creatorID: string | null = null;

  groupID!: string;

  constructor(private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    if (this.itemData.createdBy !== this.creatorID) {
      this.creatorID = null;
    }

    this.groupID = this.itemData.id;
  }

  removeGroup(): void {
    console.log(this.creatorID);
  }

  openModal(e: Event): void {
    e.stopPropagation();

    this.modalService.openRemoveGroupDialog({
      groupID: this.groupID,
      name: this.itemData.name,
    });
  }

  navigateToDialogPage(): void {
    console.log(this.groupID);
    this.router.navigate(['/group', this.groupID]);
  }
}
