import { Component } from '@angular/core';
import { StoreSaverService } from './core/services/store-saver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'connections-app';

  constructor(private storeSaver: StoreSaverService) {}
}
