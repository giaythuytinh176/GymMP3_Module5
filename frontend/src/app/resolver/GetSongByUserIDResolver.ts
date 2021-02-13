import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
  NavigationStart
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SongService} from '../services/song/song.service';
import {UserService} from '../services/userManager/user.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Song} from '../model/song/song';
import {GetUserInfoResolver} from './GetUserInfoResolver';
import {TestBed} from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class GetSongByUserIDResolver implements Resolve<any> {
  constructor(
    private songService: SongService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    protected userInfoResolve: GetUserInfoResolver,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song[]> | Promise<any> | any {
    return this.songService.getSongByUserID(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
