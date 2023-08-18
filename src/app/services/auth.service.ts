import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationData, RegistrationRespData } from '../components/register/register.component';
// import { User } from './user.model';

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

export interface User {
  isLoggedIn: boolean,
  loginId: string | null,
  role: string | null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  @Output() isLoggedIn = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("http://localhost:8000/api/users/login", loginDetails);
  }

  loggedIn(loggedInState: boolean) {
    this.isLoggedIn.emit(loggedInState);
  }

  logout() {
    this.user.next({ isLoggedIn: false, loginId: null, role: null });
    localStorage.clear();
  }

  register(registrationDetails: RegistrationData): Observable<RegistrationRespData> {
    return this.http.post<RegistrationRespData>("http://localhost:8000/api/users/registration", registrationDetails);
  }
}
