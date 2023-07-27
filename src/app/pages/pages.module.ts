import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExamsComponent } from './exams/exams.component';
import { ComponentsModule } from '../components/components.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DietsComponent } from './diets/diets.component';
import { ExerciseComponent } from './exercises/exercise.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AgePipe } from '../pipes/age.pipe';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { OrderByDateTimePipe } from '../pipes/order-by.pipe';
import { MedicalRecordsComponent } from './medical-records/medical-records.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    ExamsComponent,
    DietsComponent,
    ExerciseComponent,
    NotFoundComponent,
    HomeComponent,
    MedicalRecordComponent,
    MedicalRecordsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ComponentsModule,
    RouterModule,
    AgePipe,
    OrderByDateTimePipe,
  ],
  providers: [provideNgxMask(), DatePipe],
})
export class PagesModule {}
