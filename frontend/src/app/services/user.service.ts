import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UpdateInfo} from "../model/userManager/updateinfo";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = sessionStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }
  private getUserUrl = 'http://localhost:8000/api/user';
  private updateUserUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  updateUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.updateUserUrl}/${id}`,  data, this.httpJson);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }
}
