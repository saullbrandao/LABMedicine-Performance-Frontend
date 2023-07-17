import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toast: HotToastService) {}

  success(message: string, id?: string) {
    this.toast.success(message, { dismissible: true, id });
  }

  error(message: string, id?: string) {
    this.toast.error(message, { dismissible: true, id });
  }

  info(message: string, id?: string) {
    this.toast.info(message, { dismissible: true, id });
  }
}
