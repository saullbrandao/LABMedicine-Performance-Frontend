import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { inject } from '@angular/core';

export const doctorGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAdmin() || authService.isDoctor()) {
    return true;
  }

  notificationService.error(
    'Você não tem permissões para acessar essa página.'
  );

  return router.parseUrl('/');
};
