import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Singer} from "../../model/singer/singer";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  apiGetAllSingers = environment.apiUrl + '/singers/list';
  apiGetSingerIDBySongID = environment.apiUrl + '/findSingerIDBySongID';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  constructor(private http: HttpClient) {
  }

  getSingerIDBySongID(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetSingerIDBySongID}/${id}`, this.httpJson);
  }

  getAllSingers(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.apiGetAllSingers, this.httpJson);
  }
}
