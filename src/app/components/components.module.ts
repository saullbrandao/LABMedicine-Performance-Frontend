import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ComponentsModule {}
