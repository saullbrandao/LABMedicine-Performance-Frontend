import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { ComponentsModule } from '../components/components.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ExerciseComponent } from './exercises/exercise.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    UserRegistrationComponent,
    ExamRegistrationComponent,
    ExerciseComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ComponentsModule,
  ],
  providers: [provideNgxMask(), DatePipe],
})
export class PagesModule {}
