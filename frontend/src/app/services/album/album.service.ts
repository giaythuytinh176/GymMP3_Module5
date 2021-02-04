import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../../model/album";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiGetAllAlbum = 'http://127.0.0.1:8000/api/albums/list';

  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  constructor(private http: HttpClient) {
  }

  getAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiGetAllAlbum, this.httpJson);
  }

}
