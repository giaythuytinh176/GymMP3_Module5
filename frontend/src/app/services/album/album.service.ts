import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../../model/album";
import {environment} from "../../../environments/environment";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  apiGetAllAlbum = environment.apiUrl + '/albums/list';

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
