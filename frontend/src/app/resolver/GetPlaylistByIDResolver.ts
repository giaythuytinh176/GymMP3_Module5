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
import {UserService} from '../services/userManager/user.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {GetUserInfoResolver} from './GetUserInfoResolver';
import {TestBed} from '@angular/core/testing';
import {PlaylistService} from '../services/playlist/playlist.service';
import {Playlist} from '../model/playlist/playlist';

@Injectable({
  providedIn: 'root',
})
export class GetPlaylistByUSerID implements Resolve<any> {
  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    protected userInfoResolve: GetUserInfoResolver,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Playlist[]> | Promise<any> | any {
    return this.playlistService.getPlaylistByUserID(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
