import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
  }

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
