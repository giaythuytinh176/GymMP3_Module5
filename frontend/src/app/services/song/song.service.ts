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
  private apiListSongUser = "http://127.0.0.1:8000/api/listsongs"
  private updateSongUrl = 'http://localhost:8000/api/songs';
  private getUserUrl = 'http://localhost:8000/api/user';
  private apiGetAllSongs = 'http://localhost:8000/api/songs/list';
  private search = 'http://localhost:8000/api/search';
  private deleteSongsUrl = 'http://localhost:8000/api/songs'

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

  searchSong(key: any): Observable<any> {
    return this.http.post(`${this.search}`, {search: key});
  }

  deleteSong(id:number){
    return this.http.delete(`${this.deleteSongsUrl}/${id}`, this.httpJson);

  }
}
