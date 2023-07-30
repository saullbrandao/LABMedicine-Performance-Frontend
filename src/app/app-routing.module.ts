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
import { PatientRegistrationComponent } from "./pages/patient-registration/patient-registration.component";
import { MedicationsComponent } from "./pages/medication/medications.component";

const routes: Routes = [
  {
    path: 'cadastrar',
    component: UserRegistrationComponent,
    title: 'Cadastro de Usuários',
    // TODO: add authorization
    // canActivate: [],
  },
  {
    path: 'prontuarios',
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
