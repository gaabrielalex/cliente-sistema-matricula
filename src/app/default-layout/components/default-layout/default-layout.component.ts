import { Component, OnInit } from '@angular/core';
import { DefaultLayoutService } from '../../services/default-layout.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private defaultLayoutService: DefaultLayoutService) { }

  ngOnInit(): void {
  }

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
