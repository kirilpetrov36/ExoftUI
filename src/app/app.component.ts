import { Component} from '@angular/core';

import { setTheme } from 'ngx-bootstrap/utils';
import { LoadingService } from './core/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoadingService]
})
export class AppComponent{
  title = 'BlogUI';

  constructor(public loader: LoadingService) {
    setTheme('bs3');
  }
}
