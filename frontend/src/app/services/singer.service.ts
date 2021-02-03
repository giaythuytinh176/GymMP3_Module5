import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Singer} from "../model/singer";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  apiGetAllSingers = 'http://127.0.0.1:8000/api/singers/list';

  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  constructor(private http: HttpClient) {}

  getAllSingers(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.apiGetAllSingers, this.httpJson);
  }
}
