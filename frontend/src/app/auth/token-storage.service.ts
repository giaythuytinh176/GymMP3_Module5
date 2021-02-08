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
     window.localStorage.clear();
     window.localStorage.removeItem(TOKEN_KEY);
     window.localStorage.removeItem(Login_KEY);
      this.saveLogin('false');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      // this.router.navigate(['/browse'])
    }, (error: any) => {
      console.log(error);
    });
  }

  public saveToken(token: string): void {
   window.localStorage.removeItem(TOKEN_KEY);
   window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveLogin(login: string): void {
   window.localStorage.removeItem(Login_KEY);
   window.localStorage.setItem(Login_KEY, login);
  }

  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }
}
