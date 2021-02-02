import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
// import { info } from 'console';
import {Observable} from 'rxjs';
import {SignupInfo} from './signup-info';
import {ToastrService} from "ngx-toastr";
import {LoginInfo} from "./login-info";
import {JwtResponse} from "./jwt-response";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/signup';
  private loginUrl = 'http://127.0.0.1:8000/api/login';
  private authUrl = 'http://127.0.0.1:8000/api/user';
  error_msg = '';
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  auth = false;

  constructor(private http: HttpClient,
              private toasrt: ToastrService,
  ) {
  }

  signUp(info: SignupInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  authToken(token: string): Observable<any> {
    // console.log(token);
    return this.http.get<string>(this.authUrl, this.httpJson);
  }

  loggined(): boolean {
    if (this.token) {
      return true;
    } else {
      this.toasrt.warning('You haven\'t login ...');
      return false;
    }
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

}
