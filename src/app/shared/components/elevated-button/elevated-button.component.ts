import { Component, Input,  OnInit } from '@angular/core';

@Component({
  selector: 'app-elevated-button',
  templateUrl: './elevated-button.component.html',
  styleUrls: ['./elevated-button.component.css']
})
export class ElevatedButtonComponent implements OnInit {
  //Define se o button é primary(azul), secondary(cinza), success(verde), danger(vermelho), etc
  @Input() classCss: any;
  @Input() text: any;

  constructor() { }

  ngOnInit(): void {
  }

}
