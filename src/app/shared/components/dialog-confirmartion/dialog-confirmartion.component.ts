import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmartion',
  templateUrl: './dialog-confirmartion.component.html',
  styleUrls: ['./dialog-confirmartion.component.css']
})
export class DialogConfirmartionComponent implements OnInit {
  onEmitStatusChange = new EventEmitter();
  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit(): void {
    if(this.dialogData) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction() {
    this.onEmitStatusChange.emit();
  }
}
