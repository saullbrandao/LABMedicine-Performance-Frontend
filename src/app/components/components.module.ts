import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SelectPatientModalComponent } from './search-patient-modal/select-patient-modal.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    SelectPatientModalComponent,
    ToolbarComponent,
    SidebarComponent,
  ],
  exports: [
    ConfirmModalComponent,
    SelectPatientModalComponent,
    ToolbarComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
