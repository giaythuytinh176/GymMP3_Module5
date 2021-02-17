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

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(private http: HttpClient) {
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
    return this.http.get<Singer[]>(this.apiGetAllSingers, this.httpJson);
  }
}
