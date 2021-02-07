import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/userManager/user.service";

const TOKEN_KEY = 'AuthToken';
const Login_KEY = 'AuthLogin';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  signOut(): void {
    this.userService.removeToken(this.getToken()).subscribe((res: any) => {
      // console.log(res);
      window.sessionStorage.clear();
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.removeItem(Login_KEY);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      // this.router.navigate(['/browse'])
    }, (error: any) => {
      console.log(error);
    });
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveLogin(login: string): void {
    window.sessionStorage.removeItem(Login_KEY);
    window.sessionStorage.setItem(Login_KEY, login);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
