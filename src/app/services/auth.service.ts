import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("http://localhost:8000/api/users/login", loginDetails);
  }
}
