import { Component } from '@angular/core';
import { FaviconService } from './shared/services/favicon-service/favicon.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private faviconService: FaviconService) {}
  ngOnInit(): void {
    this.faviconService.setFavicon(environment.favicon);
  }
}
