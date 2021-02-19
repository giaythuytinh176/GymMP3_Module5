import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Playlist} from '../../model/playlist/playlist';
import {Observable} from 'rxjs';
import {Song} from 'src/app/model/song/song';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  apiCreatePlaylist = environment.apiUrl + '/playlist/create';
  apiListPlaylist = environment.apiUrl + '/playlist/list';
  apiShowListPlaylist = environment.apiUrl + '/playlist/showlist';
  apiPlaylistInfo = environment.apiUrl + '/playlist';
  apiDeletePlaylist = environment.apiUrl + '/playlist';
  apiSongOfDeletePlaylist = environment.apiUrl + '/playlist/song';
  apiAddSongToPlaylist = environment.apiUrl + '/playlist/add-song';
  apiGetListSongOfPlaylist = environment.apiUrl + '/playlist/showSong';
  apiGetAllSongsExceptInPlaylist = environment.apiUrl + '/playlist/all-songs-except';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };
  private searchPlaylist = environment.apiUrl + '/search-playlist/';

  constructor(private http: HttpClient) {
  }

  deletePlaylist(id: number, user_id: number): any {
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
    return this.http.delete(`${this.apiDeletePlaylist}/${id}`, httpHeader);
  }

  deleteSongOfPlaylist(song_id: number, user_id: number, playlist_id: number): any {
    const httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
        'Access-Control-Allow-Origin': '*',
      }),
      body: {
        user_id: user_id,
        song_id: song_id,
      },
    };
    return this.http.delete(`${this.apiSongOfDeletePlaylist}/${playlist_id}`, httpHeader);
  }

  getAllSongsExceptInPlaylist(listSong: Song[],): Observable<Song[]> {
    return this.http.post<Song[]>(`${this.apiGetAllSongsExceptInPlaylist}`, {listSong: JSON.stringify(listSong)}, this.httpJson);
  }

  getListSongOfPlaylist(playlistId: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiGetListSongOfPlaylist}/${playlistId}`, this.httpJson);
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

  searchPlaylist1(key: any): Observable<any> {
    return this.http.post(`${this.searchPlaylist}`, {search: key});
  }

  addSong(song_id: number, playlist_id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiAddSongToPlaylist}/${song_id}/${playlist_id}`, this.httpJson);
  }

}
