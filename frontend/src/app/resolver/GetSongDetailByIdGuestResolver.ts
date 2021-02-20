import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {SongService} from '../services/song/song.service';

@Injectable({
  providedIn: 'root'
})
export class GetSongDetailByIdGuestResolver implements Resolve<any> {
  constructor(
    private songService: SongService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.songService.getSongDetailByIdGuest(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
