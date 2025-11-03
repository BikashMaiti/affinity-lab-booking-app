import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/service/auth.service';

export const canActivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.authenticatedCheck().subscribe((res: any) => {
    if (res) {
      return true;
    } else {
      router.navigate(['/login']);//state.url
      return false;
    }
  })
  return true;
};
