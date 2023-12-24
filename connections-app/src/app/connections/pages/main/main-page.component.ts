import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/store/actions/groups.action';

import { GroupListComponent } from '../../components/group-list/group-list.component';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupListComponent, UserListComponent],
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GroupActions.groupLoad());
  }
}
