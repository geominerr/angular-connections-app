import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule, MatListModule, MatSlideToggleModule],
})
export class SidebarComponent {
  @Input() isLogin$: Observable<boolean> = of(false);

  @Input() userName$: Observable<string> = of('');

  @Input() isOpen: boolean = true;

  guestName: string = 'Guest';
}
