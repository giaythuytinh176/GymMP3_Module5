import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Song} from "../song/song";
import {Observable} from "rxjs";
import {UpdateInfo} from "../model/userManager/updateinfo";
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
  private updateSongUrl = 'http://localhost:8000/api/songs';
  private getUserUrl = 'http://localhost:8000/api/user';
  constructor(private http: HttpClient,private authenService:AuthService) { }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.updateSongUrl}/${id}`);
  }

  updateSong(songs: Song): Observable<Song> {
    return this.http.put<Song>(`${this.updateSongUrl}/${songs.id}`, songs);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }
}
