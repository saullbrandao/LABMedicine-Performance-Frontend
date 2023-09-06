import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  readonly menuCategories = [
    { title: 'início', route: 'home', icon: 'house-fill' },
    { title: 'prontuários', route: 'prontuarios', icon: 'person-lines-fill' },
    {
      title: 'paciente',
      route: 'pacientes',
      icon: 'person-fill',
    },
    {
      title: 'medicamento',
      route: 'medicamentos',
      icon: 'capsule',
    },
    {
      title: 'exercício',
      route: 'exercicios',
      icon: 'bicycle',
    },
    {
      title: 'dieta',
      route: 'dietas',
      icon: 'card-list',
    },
    {
      title: 'consulta',
      route: 'consultas',
      icon: 'calendar2-event',
      userTypes: [UserType.ADMIN, UserType.MEDICO],
    },
    {
      title: 'exame',
      route: 'exames',
      icon: 'activity',
      userTypes: [UserType.ADMIN, UserType.MEDICO],
    },
    {
      title: 'Listagem de registros',
      route: 'registros',
      icon: 'list-ul',
      userTypes: [UserType.ADMIN],
    },
    {
      title: 'Cadastrar usuário',
      route: 'cadastrar',
      icon: 'person-fill-add',
      userTypes: [UserType.ADMIN],
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

  userHasPermission(userTypes: UserType[] | undefined) {
    if (!userTypes || this.isAdmin()) {
      return true;
    }

    if (this.isDoctor()) {
      return userTypes.includes(UserType.MEDICO);
    }

    return false;
  }
}
