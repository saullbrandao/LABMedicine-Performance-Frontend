import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() message!: string;
  @Input() modalId!: string;
  @Output() confirmed = new EventEmitter();

  confirm(){
    this.confirmed.emit();
  }

  getModalId() {
    return this.modalId ?? 'confirmModal';
  }
}
