import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AlbumService} from '../services/album/album.service';
import {catchError, delay} from 'rxjs/operators';
import {SingerService} from '../services/singer/singer.service';

@Injectable({
  providedIn: 'root'
})
export class GetSingerIDbySongIDResolver implements Resolve<any> {
  constructor(
    private singerService: SingerService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.singerService.getSingerIDBySongIDv2(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
