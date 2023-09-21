import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadsFromToken = this.authService.getPayloadsFromToken(token);
      this.authService.user.next(payloadsFromToken);
      request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401)
          return this.handle401Error(request, next);
        return throwError(() => err);
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // private isRefreshing = false;
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;

    this.authService.user.subscribe(userData => {
      if (userData.isLoggedIn)
        this.authService.logout();
    })
    // }

    return next.handle(request);
  }
}
