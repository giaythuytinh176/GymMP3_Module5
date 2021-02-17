import {Injectable} from '@angular/core';
import {Song} from '../../model/song/song';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UpdateInfo} from '../../model/userManager/updateinfo';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };
  private API_URL_CREATE = environment.apiUrl + '/song/create';
  private API_URL_CREATE_MOVED = environment.apiUrl + '/song/moved/create';
  private apiListSongUser = environment.apiUrl + '/song/user/list';
  private apiListSongV2User = environment.apiUrl + '/song/user/listv2';
  private updateSongUrl = environment.apiUrl + '/song';
  private getUserUrl = environment.apiUrl + '/user/token';
  private apiGetAllSongs = environment.apiUrl + '/song/list';
  private apiGetMovedSongs = environment.apiUrl + '/song/moved/list';
  private search = environment.apiUrl + '/search';
  private deleteSongsUrl = environment.apiUrl + '/song';
  private deleteMovedSongsUrl = environment.apiUrl + '/song/moved';
  private API_getLastestSongs=environment.apiUrl + '/song/lastest';
  private API_getShowmoreSongsLastest=environment.apiUrl + '/song/showmore';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiGetAllSongs);
  }

  getMovedSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiGetMovedSongs);
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.API_URL_CREATE, song, this.httpJson);
  }

  createMovedSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.API_URL_CREATE_MOVED, song, this.httpJson);
  }

  getSongByUserID(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiListSongUser}/${id}`, this.httpJson);
  }

  getSongDetailV2(id: number): Observable<any> {
    return this.http.get(`${this.apiListSongV2User}/${id}`, this.httpJson);
  }

  getSongDetailById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.updateSongUrl}/${id}`, this.httpJson);
  }

  updateSong(song: Song, id: number): Observable<Song> {
    return this.http.put<Song>(`${this.updateSongUrl}/${id}`, song, this.httpJson);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }

  searchSong(key: any): Observable<any> {
    return this.http.post(`${this.search}`, {search: key});
  }

  deleteSong(id: number, user_id: number) {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        'Access-Control-Allow-Origin': '*',
      }),
      body: {
        user_id: user_id,
      },
    };
    return this.http.delete(`${this.deleteSongsUrl}/${id}`, httpHeader);
  }

  deleteMovedSong(id: number, user_id: number) {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        'Access-Control-Allow-Origin': '*',
      }),
      body: {
        user_id: user_id,
      },
    };
    return this.http.delete(`${this.deleteMovedSongsUrl}/${id}`, httpHeader);
  }

  getLastestSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_getLastestSongs);
  }

  getShowmoreSongLastest(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_getShowmoreSongsLastest);
  }
}
