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
import {SingerService} from '../services/singer/singer.service';
import {Singer} from '../model/singer/singer';

@Injectable({
  providedIn: 'root',
})
export class GetSingerInfoResolver implements Resolve<any> {
  constructor(
    private singerService: SingerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Singer[]> | Promise<any> | any {
    return this.singerService.getSingerInfo(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
