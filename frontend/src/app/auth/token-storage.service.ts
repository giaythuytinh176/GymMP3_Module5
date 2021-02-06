import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'AuthToken';
const Login_KEY = 'AuthLogin';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private router: Router) {
  }

  signOut() {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(Login_KEY);
    this.router.navigate(['/login'])
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveLogin(login: string) {
    window.sessionStorage.removeItem(Login_KEY);
    window.sessionStorage.setItem(Login_KEY, login);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
