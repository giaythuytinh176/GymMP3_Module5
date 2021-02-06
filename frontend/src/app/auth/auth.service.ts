import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
// import { info } from 'console';
import {Observable} from 'rxjs';
import {ChangePassword} from './change-password';
import {JwtResponse} from './jwt-response';
import {SignupInfo} from './signup-info';
import {ToastrService} from "ngx-toastr";
import {LoginInfo} from "./login-info";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error_msg = '';
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  auth = false;
  private signupUrl = environment.apiUrl + '/signup';
  private changePassUrl = environment.apiUrl + '/changePassword';
  private loginUrl = environment.apiUrl + '/login';
  private authUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient,
              private toasrt: ToastrService,
  ) {
  }


  signUp(info: SignupInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.changePassUrl, info, this.httpJson);
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  authToken(token: string): Observable<any> {
    // console.log(token);
    return this.http.get<string>(this.authUrl, this.httpJson);
  }

  loggined(): boolean {
    if (this.token) {
      return true;
    } else {
      this.toasrt.warning('Session expired, please login again!');
      return false;
    }
  }

}
