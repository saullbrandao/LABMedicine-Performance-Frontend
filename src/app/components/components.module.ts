import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SelectPatientModalComponent } from './search-patient-modal/select-patient-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    SelectPatientModalComponent,
    TopbarComponent,
    SidebarComponent,
  ],
  exports: [
    ConfirmModalComponent,
    SelectPatientModalComponent,
    TopbarComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class ComponentsModule {}
