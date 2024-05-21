import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-information',
  templateUrl: './banner-information.component.html',
  styleUrls: ['./banner-information.component.css']
})
export class BannerInformationComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
