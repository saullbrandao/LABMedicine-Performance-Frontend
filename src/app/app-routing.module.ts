import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: 'register',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    // TODO: add authorization
    // canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
