import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExamRegistrationComponent } from "./pages/exam-registration/exam-registration.component";
import { DietsComponent } from "./pages/diets/diets.component";

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
        component: ExamRegistrationComponent
      },
      {
        path: ':id',
        component: ExamRegistrationComponent
      }
    ]
  },
  {
    path: 'diets',
    children: [
      {
        path: '',
        component: DietsComponent
      },
      {
        path: ':id',
        component: DietsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
