import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Song} from "../song/song";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private updateSongUrl = 'http://localhost:8000/api/songs';
  constructor(private http: HttpClient,private authenService:AuthService) { }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.updateSongUrl}/${id}`);
  }

  updateSong(songs: Song): Observable<Song> {
    return this.http.put<Song>(`${this.updateSongUrl}/${songs.id}`, songs);
  }
}
