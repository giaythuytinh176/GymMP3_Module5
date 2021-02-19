import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {delay, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { SingerService } from '../services/singer/singer.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllSingersResolver implements Resolve<any> {
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
