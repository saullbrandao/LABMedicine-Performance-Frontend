import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  @Input() message!: string;
  @Input() dialogId!: string;
  @Output() confirmed = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
