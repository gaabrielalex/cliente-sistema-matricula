import { Component, OnInit } from '@angular/core';
import { DefaultLayoutService } from '../../services/default-layout.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {
  tipoUsuario: string = '';

  constructor(private defaultLayoutService: DefaultLayoutService) {
    const usuarioString = localStorage.getItem('User');

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.tipoUsuario = usuario.tipo;
    } else {
      // Define um valor padrão caso o tipo do usuário não seja encontrado
      this.tipoUsuario = 'G'; // Ou qualquer outro valor padrão adequado
    }
  }

  ngOnInit(): void {
  }

  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
