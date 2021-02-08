import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/auth.service";
import {TokenStorageService} from "../../auth/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private token: TokenStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.token.saveToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxMjI1NDY3NywiZXhwIjoxNjEyMjU4Mjc3LCJuYmYiOjE2MTIyNTQ2NzcsImp0aSI6IlBXbWlJMkhhcmhPUWo5ejEiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Y_nfNvKR4zKyIrJ6WPzp6tprSy9SmTE_CjmpNvWo928');
    // this.authService.loggined();
    // return true;
    // console.log(this.authService.loggined());
    if (this.authService.loggined()) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}
