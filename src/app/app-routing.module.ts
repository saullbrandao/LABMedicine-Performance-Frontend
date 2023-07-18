import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExamRegistrationComponent } from './pages/exam-registration/exam-registration.component';
import { ExerciseRegistrationComponent } from './pages/exercise-registration/exercise-registration.component';
import { ExerciseResolver } from './pages/exercise-registration/exercise.resolver';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    // TODO: add authorization
    // canActivate: [],
  },
  {
    path: 'examregistration',
    children: [
      {
        path: '',
        component: ExamRegistrationComponent,
      },
      {
        path: ':id',
        component: ExamRegistrationComponent,
      },
    ],
  },
  {
    path: 'exerciseregistration',
    children: [
      {
        path: '',
        component: ExerciseRegistrationComponent,
      },
      {
        path: ':id',
        component: ExerciseRegistrationComponent,
        resolve: { exercise: ExerciseResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
