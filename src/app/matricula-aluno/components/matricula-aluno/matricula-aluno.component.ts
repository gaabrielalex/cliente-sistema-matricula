import { Component, OnInit } from '@angular/core';
import { MatriculaAlunoService } from '../../services/matricula-aluno.service';

@Component({
  selector: 'app-matricula-aluno',
  templateUrl: './matricula-aluno.component.html',
  styleUrls: ['./matricula-aluno.component.css']
})
export class MatriculaAlunoComponent implements OnInit {
  // Status posssíveis
  // X - Matricula inexistente
  // I - Matricula Incompleta(documentações ainda não enviadas)
  // C - Matricula Completa(documentações enviadas)
  // A - Matricula Aprovada pelo avaliador responsável(documentações aprovadas)
  // R - Matricula Reprovada pelo avaliador responsável(documentações reprovadas)
  //Por padrão a matricula é inexistente
  statusMatricula: String = 'X'

  constructor(private matriculaAlunoService: MatriculaAlunoService) { }

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('User');
    const usuario = JSON.parse(usuarioString || '{}');

    this.matriculaAlunoService.getByEmail(usuario.email).subscribe((response: any) => {
      if(response.length > 0){
        console.log("entrou");
        //Se existir matricula então o status é o status da matricula
        this.statusMatricula = response[0].status;

      } else {
        //Se não existir matricula então o status é X
        this.statusMatricula = 'X';
      }
      console.log("O status da mat´ricula foi definido como: " + this.statusMatricula)
    },(error) => {
      console.log("O status da mat´ricula foi definido como: " + this.statusMatricula)
      console.log(error);
    })
  }

}
