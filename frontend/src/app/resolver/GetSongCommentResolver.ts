import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {SongCommentService} from '../services/comment/song-comment.service';

@Injectable({
  providedIn: 'root'
})
export class GetSongCommentResolver implements Resolve<any> {
  constructor(
    private songCommentService: SongCommentService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.songCommentService.getContentSongComment(route.params.id).pipe(
      // delay(2000),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
