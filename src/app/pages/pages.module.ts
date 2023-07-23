import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { ComponentsModule } from "../components/components.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DietsComponent } from './diets/diets.component';

@NgModule({
  declarations: [UserRegistrationComponent, ExamRegistrationComponent, DietsComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ComponentsModule],
  providers: [provideNgxMask()],
})
export class PagesModule {}
