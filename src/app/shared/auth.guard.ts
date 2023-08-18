import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  if (!localStorage.getItem('token')) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
