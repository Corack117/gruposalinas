import { Component } from '@angular/core';
import { ApiRequestsService } from './shared/api-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';

  constructor(private requestService: ApiRequestsService) {
    this.requestService.getToken();
  }
}
