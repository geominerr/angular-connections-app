import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectUserName,
  selectThemeValue,
} from 'src/app/store/selectors/user.selectors';
import { UserActions } from 'src/app/store/actions/user.actions';
import { StoreActions } from 'src/app/store/actions/store.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatListModule, MatSlideToggleModule],
})
export class SidebarComponent implements OnInit {
  @Input() isLogin$: Observable<boolean> = of(false);

  @Input() userName$: Observable<string | undefined> = of('');

  @Input() isOpen: boolean = true;

  darkTheme$: Observable<boolean> = of(false);

  guestName: string = 'Guest';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userName$ = this.store.select(selectUserName);
    this.darkTheme$ = this.store.select(selectThemeValue);
  }

  changeTheme(): void {
    this.store.dispatch(
      StoreActions.storeChangeTheme()
    );
  }

  logout(): void {
    this.store.dispatch(UserActions.userLogout());
  }
}
