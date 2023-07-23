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

@NgModule({
  declarations: [
    UserRegistrationComponent,
    ExamsComponent,
    DietsComponent,
    ExerciseComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ComponentsModule,
    RouterModule,
    AgePipe,
  ],
  providers: [provideNgxMask(), DatePipe],
})
export class PagesModule {}
