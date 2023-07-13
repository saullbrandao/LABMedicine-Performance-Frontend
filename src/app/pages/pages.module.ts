import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRegistrationComponent } from './exam-registration/exam-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../components/components.module";

@NgModule({
  declarations: [
    ExamRegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
