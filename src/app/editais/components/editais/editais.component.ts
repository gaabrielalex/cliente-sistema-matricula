import { Component, OnInit } from '@angular/core';
import { EditaisService } from '../../services/editais.service';

@Component({
  selector: 'app-editais',
  templateUrl: './editais.component.html',
  styleUrls: ['./editais.component.css']
})
export class EditaisComponent implements OnInit {

  constructor(private editaisService: EditaisService) { }

  ngOnInit(): void {
  }

}
