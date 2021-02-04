import {Injectable} from '@angular/core';
import {Song} from '../../model/song/song';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UpdateInfo} from "../../model/userManager/updateinfo";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  private API_URL_CREATE = environment.apiUrl + '/song/create';
  private apiListSongUser = environment.apiUrl + '/listsongs';
  private updateSongUrl = environment.apiUrl + '/songs';
  private getUserUrl = environment.apiUrl + '/user';
  private apiGetAllSongs = environment.apiUrl + '/songs/list';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiGetAllSongs);
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.API_URL_CREATE, song, this.httpJson);
  }

  getSongDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiListSongUser}/${id}`, this.httpJson)
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.updateSongUrl}/${id}`);
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.updateSongUrl}/${song.id}`, song);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }
}
