import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// TODO: fix the usages of this component and maybe rename it to confirm-dialog
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() message!: string;
  @Input() modalId!: string;
  @Output() confirmed = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
