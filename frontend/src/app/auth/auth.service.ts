import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { info } from 'console';
import { Observable } from 'rxjs';
import { SignupInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/signup';

  constructor(private http: HttpClient) {
    }

    signUp(info: SignupInfo): Observable<string> {
      console.log(info);
      return this.http.post<string>(this.signupUrl, info, httpOptions);   
    } 
}
