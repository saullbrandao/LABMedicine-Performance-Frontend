import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { ExamsComponent } from "./pages/exams/exams.component";
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
    path: 'exams',
    children: [
      {
        path: '',
        component: ExamsComponent
      },
      {
        path: ':id',
        component: ExamsComponent
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
