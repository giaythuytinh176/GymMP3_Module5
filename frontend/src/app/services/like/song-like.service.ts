import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ILikeDislike} from '../../component/like/song-like/song-like.component';
import {Song} from '../../model/song/song';

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
  private apiGetLikeDislike = environment.apiUrl + '/likedislike/song';
  private apiGetTop10Likes = environment.apiUrl + '/likedislike/song/top/10';

  constructor(
    private http: HttpClient,
  ) {
  }

  getTop10Likes(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiGetTop10Likes);
  }

  getLikeDisLike(songId: number): Observable<ILikeDislike> {
    return this.http.get<ILikeDislike>(`${this.apiGetLikeDislike}/${songId}`);
  }

  addLikeToSong(userId: number, songId: number, likedislike: 'like' | 'dislike'): Observable<any> {
    return this.http.post(this.apiAddLikeToSong, {
      user_id: userId,
      song_id: songId,
      likedislike,
    }, this.httpJson);
  }
}
