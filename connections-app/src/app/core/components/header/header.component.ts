import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable, of } from 'rxjs';
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
export class HeaderComponent {
  @Input() isLogin$: Observable<boolean> = of(false);

  @Output() isMenuOpen: boolean = false;

  title: string = 'Polymer';

  toggleMenu(event: Event): void {
    event.stopPropagation();

    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
