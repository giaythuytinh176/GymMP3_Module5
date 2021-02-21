import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SongComment} from '../../model/comment/song-comment';
import {Observable} from 'rxjs';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SongCommentService {
  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };
  private apiPostComment = environment.apiUrl + '/comment/song';
  private apiGetSongComment = environment.apiUrl + '/comment/song';

  constructor(
    private http: HttpClient,
  ) {
  }

  getContentSongComment(id: number): Observable<SongComment[]> {
    return this.http.get<SongComment[]>(`${this.apiGetSongComment}/${id}`);
  }

  postCommentSong(obj: SongComment, id: number): Observable<any> {
    return this.http.post(`${this.apiPostComment}/${id}`, obj);
  }

}
