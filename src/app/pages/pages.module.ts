import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsComponent } from './exams/exams.component';
import { ComponentsModule } from "../components/components.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DietsComponent } from './diets/diets.component';

@NgModule({
  declarations: [UserRegistrationComponent, ExamsComponent, DietsComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, ComponentsModule],
  providers: [provideNgxMask()],
})
export class PagesModule {}
