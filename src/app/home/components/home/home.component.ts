import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = 'fictional person';

  constructor(
    private homeService: HomeService
  ) {
    const usuarioString = localStorage.getItem('User');

    if (usuarioString) {
      // 2. Converte a string JSON de volta para um objeto JavaScript
      const usuario = JSON.parse(usuarioString);

      // 3. Acessa a propriedade 'nome' do objeto para obter o nome do usuário
      this.userName = usuario.nome;
    } else {
      this.userName = 'Nome não encontrado';
    }
  }

  ngOnInit(): void {
  }

}
