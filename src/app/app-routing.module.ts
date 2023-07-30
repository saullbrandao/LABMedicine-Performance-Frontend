import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExerciseComponent } from './pages/exercises/exercise.component';
import { ExerciseResolver } from './pages/exercises/exercise.resolver';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { DietsComponent } from './pages/diets/diets.component';
import { HomeComponent } from './pages/home/home.component';
import { MedicalRecordComponent } from './pages/medical-record/medical-record.component';
import { MedicalRecordsComponent } from './pages/medical-records/medical-records.component';
import { PatientRegistrationComponent } from './pages/patient-registration/patient-registration.component';
import { MedicationsComponent } from './pages/medication/medications.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

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
    canActivate: [authGuard],
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
    children: [
      {
        path: '',
        component: PatientRegistrationComponent,
      },
      {
        path: ':id',
        component: PatientRegistrationComponent,
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
    path: 'exames',
    canActivate: [authGuard],
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
