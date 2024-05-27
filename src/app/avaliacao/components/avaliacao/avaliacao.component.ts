import { Component, OnInit } from '@angular/core';
import { AvaliacaoService } from '../../services/avaliacao.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  constructor(private avaliacaoService: AvaliacaoService) { }

  ngOnInit(): void {
  }

}
