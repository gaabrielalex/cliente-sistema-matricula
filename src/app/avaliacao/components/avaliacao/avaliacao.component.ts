import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  idMatricula: number = 0;

  constructor(
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id_matricula');
      this.idMatricula = id !== null ? +id : 0;
      if (this.idMatricula !== null) {
        this.carregarDados(this.idMatricula);
      } else {
        console.error('id_matricula is null');
      }
    });
  }

  carregarDados(id: number) {
    // this.snackbarService.openSnackBar('O ID da matrícula é: ' + id, 'OK');

  }

}
