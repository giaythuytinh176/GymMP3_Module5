import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {delay, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {SongService} from "../services/song/song.service";

@Injectable()
export class GetAllSongsResolver implements Resolve<any> {
  constructor(private songService: SongService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.songService.getAllSongs(route.params['id']).pipe(
      //delay(1),
      catchError(error => {
          this.router.navigateByUrl('/404');
          return of(null);
        }
      ));
  }
}
