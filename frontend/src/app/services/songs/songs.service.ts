import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Songs } from 'src/app/model/songs/songs';
const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class SongsService {
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  private baseUrl = "http://127.0.0.1:8000/api/listsongs"

  constructor( private http:HttpClient) { }

  getSongDetail(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`, this.httpJson)
  }

}
