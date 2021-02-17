import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/userManager/user.service';
import {ToastrService} from 'ngx-toastr';

const TOKEN_KEY = 'AuthToken';
const Login_KEY = 'AuthLogin';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
  }

  signOut(): void {
    this.userService.removeToken(this.getToken()).subscribe((res: any) => {
      // console.log(res);
      // window.localStorage.clear();
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(Login_KEY);
      this.saveLogin('false');
      setTimeout(() => {
        window.location.reload();
      }, 1111);
      // this.router.navigate(['/browse'])
    }, (error: any) => {
      console.log(error);
      // if (error.error.message) {
      //   this.toastr.warning('You must log in to perform this action.');
      // }
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(Login_KEY);
      this.saveLogin('false');
      setTimeout(() => {
        window.location.reload();
      }, 1111);
      // this.router.navigate(['/login'])
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
