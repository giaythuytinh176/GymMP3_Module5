import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SongLikeService {
  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };
  private apiAddLikeToSong = environment.apiUrl + '/likedislike/song';

  constructor(
    private http: HttpClient,
  ) {
  }

  addLikeToSong(userId: number, songId: number, likedislike: 'like' | 'dislike'): Observable<any> {
    return this.http.post(this.apiAddLikeToSong, {
      user_id: userId,
      song_id: songId,
      likedislike: likedislike,
    }, this.httpJson);
  }
}
