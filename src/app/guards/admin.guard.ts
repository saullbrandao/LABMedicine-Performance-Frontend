import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification/notification.service';
import { inject } from '@angular/core';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isAdmin()) {
    return true;
  }

  notificationService.error(
    'Você não tem permissões para acessar essa página.'
  );

  return router.parseUrl('/');
};
