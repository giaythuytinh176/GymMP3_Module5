import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Album} from "../../model/album/album";
import {Category} from "../../model/category/category";
import {Song} from "../../model/song/song";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiGetAllAlbum = environment.apiUrl + '/album/list';
  apiGetAlbumInfo = environment.apiUrl + '/album';
  apiCreateAlbum = environment.apiUrl + '/album/create';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  constructor(private http: HttpClient) {
  }

  createAlbum(album: Album): Observable<Song> {
    return this.http.post<Song>(this.apiCreateAlbum, album, this.httpJson);
  }

  getAlbumInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetAlbumInfo}/${id}`, this.httpJson);
  }

  getAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiGetAllAlbum, this.httpJson);
  }

}
