import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from '../services/userManager/user.service';
import {UpdateInfo} from '../model/userManager/updateinfo';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetUserInfoResolver implements Resolve<any> {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UpdateInfo> | Promise<any> | any {
    return this.userService.getInfoUserToken().pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
