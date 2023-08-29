import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  readonly menuCategories = [
    { title: 'Início', route: '/', icon: 'house-fill' },
    { title: 'Listagem de prontuários', route: 'prontuarios', icon: 'list-ul' },
    {
      title: 'Cadastrar paciente',
      route: 'pacientes',
      icon: 'plus-square-fill',
    },
    {
      title: 'Cadastrar medicamento',
      route: 'medicamentos',
      icon: 'plus-square-fill',
    },
    {
      title: 'Cadastrar exercício',
      route: 'exercicios',
      icon: 'plus-square-fill',
    },
    {
      title: 'Cadastrar dieta',
      route: 'dietas',
      icon: 'plus-square-fill',
    },
  ];

  readonly doctorMenu = [
    {
      title: 'Cadastrar consulta',
      route: 'consultas',
      icon: 'plus-square-fill',
    },
    { title: 'Cadastrar exame', route: 'exames', icon: 'plus-square-fill' },
  ];

  readonly adminMenu = [
    { title: 'Listagem de registros', route: 'registros', icon: 'list-ul' },
    {
      title: 'Cadastrar usuário',
      route: 'cadastrar',
      icon: 'plus-square-fill',
    },
  ];

  confirmMessage = 'Deseja realmente sair?';
  shouldShowElement: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

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

  private checkScreenWidth() {
    this.shouldShowElement = window.innerWidth > 992;
  }
}
