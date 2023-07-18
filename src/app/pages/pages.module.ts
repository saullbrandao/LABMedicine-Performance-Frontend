import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { ComponentsModule } from "../components/components.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ExerciseRegistrationComponent } from './exercise-registration/exercise-registration.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [UserRegistrationComponent, ExamRegistrationComponent, ExerciseRegistrationComponent, NotFoundComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ComponentsModule],
  providers: [provideNgxMask()],

})
export class PagesModule {}
