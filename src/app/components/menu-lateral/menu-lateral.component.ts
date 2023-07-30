import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css'],
})
export class MenuLateralComponent {
  readonly menuCategories = [
    { title: 'início', route: '/', icon: 'house-fill' },
    { title: 'listagem de prontuários', route: 'prontuarios', icon: 'list-ul' },
    {
      title: 'cadastrar paciente',
      route: 'pacientes',
      icon: 'plus-square-fill',
    },
    {
      title: 'cadastrar medicamento',
      route: 'medicamentos',
      icon: 'plus-square-fill',
    },
    {
      title: 'cadastrar exercício',
      route: 'exercicios',
      icon: 'plus-square-fill',
    },
    {
      title: 'cadastrar dieta',
      route: 'dietas',
      icon: 'plus-square-fill',
    },
  ];

  readonly doctorMenu = [
    {
      title: 'cadastrar consulta',
      route: 'consultas',
      icon: 'plus-square-fill',
    },
    { title: 'cadastrar exame', route: 'exames', icon: 'plus-square-fill' },
  ];

  readonly adminMenu = [
    { title: 'listagem de registros', route: 'registros', icon: 'list-ul' },
    {
      title: 'cadastrar usuário',
      route: 'cadastrar',
      icon: 'plus-square-fill',
    },
  ];

  confirmMessage = 'Deseja realmente sair?';

  constructor(private router: Router, private authService: AuthService) {}

  shouldDisplay() {
    return !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isDoctor() {
    return this.authService.isDoctor();
  }
}
