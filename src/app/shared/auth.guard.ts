import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router: Router = inject(Router);
  if (!localStorage.getItem('token')) {
    // router.navigate(['/login']);
    console.log(route);
    return createUrlTreeFromSnapshot(route, ['/', 'login']);
    // return false;
  }
  return true;
};

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService: AuthService = inject(AuthService);
  let role: string | null = '';
  authService.user.subscribe((userData: User) => role = userData.role);
  console.log(role);
  return role === 'admin' ? true : createUrlTreeFromSnapshot(route, ['/', 'movies']);
}