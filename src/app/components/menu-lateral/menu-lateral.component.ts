import { Component } from '@angular/core';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  links = [
    { text: 'Cadastro de Consulta' },
    { text: 'Cadastro de Exame' },
    { text: 'Cadastro de Medicamento' },
    { text: 'Cadastro de Exercícios' },
    { text: 'Cadastro de Dietas' }
  ];

}
