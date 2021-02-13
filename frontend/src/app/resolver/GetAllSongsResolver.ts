import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {delay, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SongService} from '../services/song/song.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllSongsResolver implements Resolve<any> {
  constructor(
    private songService: SongService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    return this.songService.getAllSongs().pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
