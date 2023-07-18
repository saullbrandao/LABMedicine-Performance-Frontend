import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SelectPatientModalComponent } from './search-patient-modal/select-patient-modal.component';

@NgModule({
    declarations: [
        ConfirmModalComponent,
        SelectPatientModalComponent
    ],
    exports: [
        ConfirmModalComponent,
        SelectPatientModalComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ComponentsModule {}
