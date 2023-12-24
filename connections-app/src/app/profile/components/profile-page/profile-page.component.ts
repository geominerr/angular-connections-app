import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { selectUserProfile } from 'src/app/store/selectors/user.selectors';

import { ProfileComponent } from '../profile/profile.component';
import { IUserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, ProfileComponent],
})
export class ProfilePageComponent implements OnInit {
  userProfile$!: Observable<IUserProfile | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProfileActions.profileLoad());
    this.userProfile$ = this.store.select(selectUserProfile);
  }
}
