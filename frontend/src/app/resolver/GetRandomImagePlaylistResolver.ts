import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PlaylistService} from '../services/playlist/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class GetRandomImagePlaylistResolver implements Resolve<any> {
  constructor(
    private playlistService: PlaylistService,
    private router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.playlistService.getRandomImagePlaylist(route.params.id).pipe(
      // delay(2000),
      // catchError(error => {
      //     this.router.navigateByUrl('/404');
      //     return of(null);
      //   }
      // )
    );
  }
}
