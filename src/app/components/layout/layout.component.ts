import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TitleService } from 'src/app/services/title.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  title: string = '';
  username: string | undefined = '';
  displayToolbarAndSidenav = true;
  private destroy$ = new Subject<void>();
  private titleSubscription: Subscription | undefined;
  @ViewChild('sidenavRef') sidenav!: MatSidenav;
  readonly menuCategories = [
    { title: 'Início', route: '/', icon: 'house' },
    { title: 'Prontuários', route: 'prontuarios', icon: 'lists' },
    {
      title: 'Paciente',
      route: 'pacientes',
      icon: 'person',
    },
    {
      title: 'Medicamento',
      route: 'medicamentos',
      icon: 'medication',
    },
    {
      title: 'Exercício',
      route: 'exercicios',
      icon: 'fitness_center',
    },
    {
      title: 'Dieta',
      route: 'dietas',
      icon: 'restaurant_menu',
    },
  ];

  readonly doctorMenu = [
    {
      title: 'Cadastrar consulta',
      route: 'consultas',
      icon: 'event_available',
    },
    { title: 'Cadastrar exame', route: 'exames', icon: 'monitor_heart' },
  ];

  readonly adminMenu = [
    { title: 'Listagem de registros', route: 'registros', icon: 'list' },
    {
      title: 'Cadastrar usuário',
      route: 'cadastrar',
      icon: 'how_to_reg',
    },
  ];

  constructor(
    private router: Router,
    private titleService: TitleService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    this.displayToolbarAndSidenav = !this.router.isActive('/login', {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  openDialog() {
    this.dialogService.openDialog(
      () => this.logout(),
      'Deseja realmente sair?'
    );
  }

  ngAfterViewInit(): void {
    this.titleSubscription = this.titleService
      .getPageTitle()
      .pipe(takeUntil(this.destroy$))
      .subscribe((title: string) => {
        this.title = title;
        this.changeDetectorRef.detectChanges();
      });

    this.getUserName();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
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

  getUserName() {
    this.username = this.authService.getUserName();
    this.changeDetectorRef.detectChanges();
  }
}
