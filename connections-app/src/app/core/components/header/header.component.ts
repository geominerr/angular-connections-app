import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthStatus } from 'src/app/store/selectors/user.selectors';

import { OutsideClickDirective } from 'src/app/core/directives/outside-click.directive';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SidebarComponent,
    OutsideClickDirective,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() isLogin$!: Observable<boolean>;

  @Output() isMenuOpen: boolean = false;

  title: string = 'Polymer';

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.isLogin$ = this.store.select(selectAuthStatus);
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();

    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  navigateToSignInPage(): void {
    this.router.navigate(['/signin']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
