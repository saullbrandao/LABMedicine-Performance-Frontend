import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SelectPatientModalComponent } from './search-patient-modal/select-patient-modal.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [ConfirmModalComponent, SelectPatientModalComponent, ToolbarComponent],
  exports: [ConfirmModalComponent, SelectPatientModalComponent, ToolbarComponent],
  imports: [CommonModule],
})
export class ComponentsModule {}
