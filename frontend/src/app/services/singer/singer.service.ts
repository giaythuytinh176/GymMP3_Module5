import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Singer} from '../../model/singer/singer';
import {Song} from '../../model/song/song';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  apiGetAllSingers = environment.apiUrl + '/singer/list';
  apiGetSingerIDBySongID = environment.apiUrl + '/singer/id/song-id';
  apiGetSingerIDBySongIDv2 = environment.apiUrl + '/singer/id/song-id-v2';
  apiCreateSinger = environment.apiUrl + '/singer/create';
  apiGetShowSongSinger = environment.apiUrl + '/singer/show-song';
  apiGetSingerByID = environment.apiUrl + '/singer/show-singer';
  apiAddSingerToSong = environment.apiUrl + '/singer/add/song';
  apiDeleteSingerFromSong = environment.apiUrl + '/singer/delete/song';

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

  addSingerToSong(singerName: string, songId: number): any {
    return this.http.post<any>(this.apiAddSingerToSong, {singerName: singerName, songId: songId}, this.httpJson);
  }

  deleteSingerfromSong(singerName: string, songId: number): any {
    return this.http.post<any>(this.apiDeleteSingerFromSong, {singerName: singerName, songId: songId}, this.httpJson);
  }

  createSinger(singer: Singer): Observable<Song> {
    return this.http.post<Song>(this.apiCreateSinger, singer, this.httpJson);
  }

  getSingerIDBySongID(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetSingerIDBySongID}/${id}`, this.httpJson);
  }

  getSingerIDBySongIDv2(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetSingerIDBySongIDv2}/${id}`, this.httpJson);
  }

  getAllSingers(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.apiGetAllSingers);
  }

  getShowSongSinger(singer_id: number): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiGetShowSongSinger}/${singer_id}`);
  }

  getSingerInfo(id: number): Observable<Singer> {
    return this.http.get<Singer>(`${this.apiGetSingerByID}/${id}`);
  }
}
