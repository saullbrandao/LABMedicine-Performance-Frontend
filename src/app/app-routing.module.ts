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

const routes: Routes = [
  {
    path: 'cadastrar',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    // TODO: add authorization
    // canActivate: [],
  },
  {
    path: 'pacientes',
    children: [
      {
        path: ':id/prontuario',
        component: MedicalRecordComponent,
      },
    ],
  },
  {
    path: 'exames',
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
  },
  {
    path: 'nao-encontrado',
    component: NotFoundComponent,
    title: '404 | Não Encontrado',
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
