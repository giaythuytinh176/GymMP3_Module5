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
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error_msg = '';
  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  auth = false;
  private signupUrl = environment.apiUrl + '/user/signup';
  private changePassUrl = environment.apiUrl + '/user/change-password';
  private loginUrl = environment.apiUrl + '/user/login';
  private authUrl = environment.apiUrl + '/user/token';

  constructor(private http: HttpClient,
              private toasrt: ToastrService,
              private tokenStorage: TokenStorageService,
  ) {
  }

  tokenExpired() {
    const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  signUp(info: SignupInfo): Observable<string> {
    // console.log(info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.changePassUrl, info, this.httpJson);
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  authToken(): Promise<any> {
    // console.log(token);
    return this.http.get<any>(this.authUrl, this.httpJson).toPromise().then(r => {
      if (r.user?.username) {
        this.tokenStorage.saveLogin('true');
        return true;
      } else {
        this.tokenStorage.signOut();
        return false;
      }
    }).catch(error => {
      this.tokenStorage.signOut();
      return false;
      // return Promise.reject(error);
    });
  }

  authToken2(): any {
    return this.http
      .get<any>(this.authUrl, this.httpJson)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  checkAuthToken(): void {
    this.http.get<any>(this.authUrl, this.httpJson).subscribe((res: any) => {
      if (res.user?.username) {
        console.log(res);
        this.tokenStorage.saveLogin('true');
      } else {
        this.tokenStorage.signOut();
      }
    }, (error: any) => {
      // console.log(error);
    });
  }

  loggined(): boolean {
    if (this.token) {
      this.checkAuthToken();
      // if (this.tokenExpired()) {
      //   return false;
      // } else {
      if (this.token) {
        return true;
      } else {
        return false;
      }
      //}
    } else {
      this.toasrt.warning('Session expired or Not login yet, please login again!');
      return false;
    }
  }

}
