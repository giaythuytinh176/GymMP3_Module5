import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Playlist} from "../../model/playlist/playlist";
import {Observable} from "rxjs";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  apiCreatePlaylist = environment.apiUrl + '/playlist/create';
  apiListPlaylist = environment.apiUrl + '/playlist/list';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {
  }

  createPlaylist(pl: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiCreatePlaylist, pl, this.httpJson);
  }

}
