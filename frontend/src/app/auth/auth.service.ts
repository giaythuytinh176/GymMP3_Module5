import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { info } from 'console';
import { Observable } from 'rxjs';
import { ChangePassword } from './change-password';
import { JwtResponse } from './jwt-response';
import { SignupInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/signup';
  private changePassUrl = 'http://localhost:8080/api/changePassword';


  constructor(private http: HttpClient) {
    }

    signUp(info: SignupInfo): Observable<string> {
      console.log(info);
      return this.http.post<string>(this.signupUrl, info, httpOptions);   
    } 

    changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
      return this.http.put<JwtResponse>(this.changePassUrl, info, httpOptions);
    }
}
