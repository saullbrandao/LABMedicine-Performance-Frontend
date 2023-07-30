import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExerciseResolver } from './pages/exercises/exercise.resolver';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { DietsComponent } from './pages/diets/diets.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicalRecordComponent } from './pages/medical-record/medical-record.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { MedicationsComponent } from './pages/medication/medications.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { doctorGuard } from './guards/doctor.guard';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ExerciseComponent } from './pages/exercises/exercise.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Página de login',
  },
  {
    path: 'cadastrar',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'registros',
    component: LogsComponent,
    title: 'Página de Registros',
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'prontuarios',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MedicalRecordsComponent,
      },
      {
        path: ':id',
        component: MedicalRecordComponent,
      },
    ],
  },
  {
    path: 'pacientes',
    canActivate: [authGuard],
    title: 'Pacientes',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: ':id',
        component: PatientsComponent,
      },
    ],
  },
  {
    path: 'medicamentos',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: MedicationsComponent,
      },
      {
        path: ':id',
        component: MedicationsComponent,
      },
    ],
  },
  {
    path: 'consultas',
    canActivate: [authGuard, doctorGuard],
    children: [
      {
        path: '',
        component: AppointmentsComponent,
      },
      {
        path: ':id',
        component: AppointmentsComponent,
      },
    ],
  },
  {
    path: 'exames',
    canActivate: [authGuard, doctorGuard],
    children: [
      {
        path: '',
        component: ExamsComponent,
      },
      {
        path: ':id',
        component: ExamsComponent,
      },
    ],
  },
  {
    path: 'dietas',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DietsComponent,
      },
      {
        path: ':id',
        component: DietsComponent,
      },
    ],
  },
  {
    path: 'exercicios',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ExerciseComponent,
      },
      {
        path: ':id',
        component: ExerciseComponent,
        resolve: { exercise: ExerciseResolver },
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Página Inicial',
    canActivate: [authGuard],
  },
  {
    path: 'nao-encontrado',
    component: NotFoundComponent,
    title: '404 | Não Encontrado',
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'nao-encontrado',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
