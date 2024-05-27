import { MatriculasAvaliacaoService } from './../../services/matriculas-avaliacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matriculas-avaliacao',
  templateUrl: './matriculas-avaliacao.component.html',
  styleUrls: ['./matriculas-avaliacao.component.css']
})
export class MatriculasAvaliacaoComponent implements OnInit {

  constructor(private matriculasAvaliacaoService: MatriculasAvaliacaoService) { }

  ngOnInit(): void {
  }

}
