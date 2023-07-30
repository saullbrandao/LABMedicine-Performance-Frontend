import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  public handleError = (error: HttpErrorResponse) => {
    switch (error.status) {
      case 400:
        if (error.url?.endsWith('/resetarsenha')) {
          this.handleWrongCredentials();
        }
        break;
      case 403:
        if (error.url?.endsWith('/login')) {
          this.handleWrongCredentials();
        }
        break;
      case 404:
        this.handle404Error();
        break;
      case 409:
        this.handleConflict(error);
        break;
      default:
        this.handleUnknownError();
        break;
    }
  };

  private handle404Error = () => {
    this.router.navigate(['/not-found']);
  };

  private handleWrongCredentials = () => {
    this.notificationService.error('Email ou senha inválido');
  };

  private handleUnknownError() {
    this.notificationService.error(
      'Ocorreu um erro. Tente novamente mais tarde.',
      'unkown-error'
    );
  }

  private handleConflict(error: HttpErrorResponse) {
    error.error.forEach((err: any) => {
      const message = `${err.field} - ${err.message}`;
      this.notificationService.error(message);
    });
  }
}
