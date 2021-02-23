import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SongLikeService} from '../services/like/song-like.service';

@Injectable({
  providedIn: 'root'
})
export class GetLikeDisLikeSongResover implements Resolve<any> {
  constructor(
    private songLikeService: SongLikeService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.songLikeService.getLikeDisLike(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
