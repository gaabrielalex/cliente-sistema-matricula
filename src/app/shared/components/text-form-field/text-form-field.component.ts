import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-form-field',
  templateUrl: './text-form-field.component.html',
  styleUrls: ['./text-form-field.component.css']
})
export class TextFormFieldComponent implements OnInit {
  @Input() id: any;
  @Input() type: any;
  @Input() label: any;
  @Input() placeholder: any;
  @Input() ngModel: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
