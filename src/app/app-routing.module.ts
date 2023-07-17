import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamRegistrationComponent } from "./pages/exam-registration/exam-registration.component";

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
