import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SingerService} from '../services/singer/singer.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetSingersResolver implements Resolve<any> {
  constructor(
    private singerService: SingerService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.singerService.getAllSingers().pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
