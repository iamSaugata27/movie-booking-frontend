import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegistrationData, RegistrationRespData } from '../components/register/register.component';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export interface LoginDetails {
  loginId: string,
  password: string
}

export interface LoginResponse {
  message: string,
  role: string,
  loginId: string,
  token: string
}

export type User = {
  isLoggedIn: boolean,
  loginId: string | null,
  role: string | null
}

export type Users = {
  firstname: string,
  lastname: string,
  loginId: string,
  email: string,
  role: string,
  contactNumber: number
}

export type decodeTokenResp = User & {
  iat: number,
  exp: number
}

export type OTPVerification = {
  loginId: string,
  enteredOTP: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  clearTimeout!: any;
  isSessionExpired!: boolean;

  // @Output() isLoggedIn = new EventEmitter<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("http://localhost:8000/api/users/login", loginDetails).pipe(
      tap((respData: LoginResponse) => {
        localStorage.setItem('token', respData.token);
        this.user.next(this.getPayloadsFromToken(respData.token));
      })
    );
  }

  getPayloadsFromToken(token: string): User {
    const payloads = jwt_decode(token);
    console.log(payloads);
    const { loginId, role, exp } = payloads as decodeTokenResp;
    const expirationTime = exp * 1000 - new Date().getTime() > 0 ? exp * 1000 - new Date().getTime() : 1000;
    this.autoLogout(expirationTime);
    return { isLoggedIn: true, loginId, role };
  }

  logout() {
    this.user.next({ isLoggedIn: false, loginId: null, role: null });
    localStorage.clear();
    this.router.navigate(['/login']);
    if (this.clearTimeout)
      clearTimeout(this.clearTimeout);
  }

  autoLogout(expirationTime: number) {
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  register(registrationDetails: RegistrationData): Observable<RegistrationRespData> {
    return this.http.post<RegistrationRespData>(`${environment.BASE_URL}/registration`, registrationDetails);
  }

  sendOTP(userIdentity: string): Observable<{ message: string, loginId: string }> {
    return this.http.get<{ message: string, loginId: string }>(`${environment.BASE_URL}/users/forgotPassword/${userIdentity}`);
  }

  verifyOTP(OTPVerificationPayload: OTPVerification): Observable<{ OTPmatched: boolean }> {
    return this.http.post<{ OTPmatched: boolean }>(`${environment.BASE_URL}/users/verifyOTP`, OTPVerificationPayload);
  }

  resetPassword(loginId: string, newPassword: string, confirmNewPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.BASE_URL}/users/resetPassword`, { loginId, newPassword, confirmNewPassword });
  }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${environment.BASE_URL}/users/`);
  }

  makeAsAdmin(loginId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.BASE_URL}/users/makeAdmin`, { loginId });
  }
}
