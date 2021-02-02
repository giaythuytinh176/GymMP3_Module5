import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { info } from 'console';
import { Observable } from 'rxjs';
import { SignupInfo } from './signup-info';
import {LoginInfo} from "./login-info";
import {JwtResponse} from "./jwt-response";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/signup';
  private loginUrl = 'http://127.0.0.1:8000/api/login';

  constructor(private http: HttpClient) {
  }

  signUp(info: SignupInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(USERNAME_KEY);
    const authority = sessionStorage.getItem(AUTHORITIES_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }
}
