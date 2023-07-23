import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExerciseComponent } from './pages/exercises/exercise.component';
import { ExerciseResolver } from './pages/exercises/exercise.resolver';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { DietsComponent } from './pages/diets/diets.component';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    // TODO: add authorization
    // canActivate: [],
  },
  {
    path: 'exams',
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
    path: 'diets',
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
    path: 'exercises',
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
    path: 'not-found',
    component: NotFoundComponent,
    title: '404 | Not found',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
