import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import {
  selectAuthStatus,
  selectThemeValue,
} from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgIf, AsyncPipe, MatButtonModule],
})
export class NotFoundComponent implements OnInit {
  authStatus$!: Observable<boolean>;

  darkMode$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.authStatus$ = this.store.select(selectAuthStatus);
    this.darkMode$ = this.store.select(selectThemeValue);
  }

  navigateToSignInPage(): void {
    this.router.navigate(['/signin']);
  }

  navigateToMainPage(): void {
    this.router.navigate(['/']);
  }
}
