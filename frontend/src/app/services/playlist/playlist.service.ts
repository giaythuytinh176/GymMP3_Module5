import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Playlist} from '../../model/playlist/playlist';
import {Observable} from 'rxjs';
import { Song } from 'src/app/model/song/song';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  apiCreatePlaylist = environment.apiUrl + '/playlist/create';
  apiListPlaylist = environment.apiUrl + '/playlist/list';
  apiShowListPlaylist = environment.apiUrl + '/playlist/showlist';
  apiPlaylistInfo = environment.apiUrl + '/playlist';
  apiAddSongToPlaylist =  environment.apiUrl + '/playlist/add-song'


  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private http: HttpClient) {
  }

  createPlaylist(pl: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiCreatePlaylist, pl, this.httpJson);
  }

  getPlaylistByUserID(id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiShowListPlaylist}/${id}`, this.httpJson);
  }

  getPlaylistInfo(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiPlaylistInfo}/${id}`, this.httpJson);
  }

  addSong(song_id: number, playlist_id: number ): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiAddSongToPlaylist}/${song_id}/${playlist_id}`, this.httpJson);
  }

  
  
}
