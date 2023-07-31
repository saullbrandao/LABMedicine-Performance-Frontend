import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { inject } from '@angular/core';

export const authGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (state.url === '/login') {
    if (authService.isLoggedIn()) {
      return router.navigate(['/']);
    }

    return true;
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  notificationService.error(
    'Você precisa estar logado pra acessar esta página!'
  );

  return router.parseUrl('/login');
};
