import {Injectable} from '@angular/core';
import {Song} from '../../model/song/song';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private readonly API_URL_CREATE = environment.apiUrl + '/song/create';
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.API_URL_CREATE, song, this.httpJson);
  }
}
