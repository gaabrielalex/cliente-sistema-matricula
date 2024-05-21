import { Component, OnInit } from '@angular/core';
import { MatriculaAlunoService } from '../../services/matricula-aluno.service';

@Component({
  selector: 'app-matricula-aluno',
  templateUrl: './matricula-aluno.component.html',
  styleUrls: ['./matricula-aluno.component.css']
})
export class MatriculaAlunoComponent implements OnInit {

  constructor(private matriculaAlunoService: MatriculaAlunoService) { }

  ngOnInit(): void {
  }

}
