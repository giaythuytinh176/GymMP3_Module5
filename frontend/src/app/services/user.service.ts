import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UpdateInfo} from "../model/userManager/updateinfo";
import {environment} from "../../environments/environment";

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
  private getUserUrl = environment.apiUrl + '/user';
  private updateUserUrl = environment.apiUrl + '/users';
  private apiCheckExistUserUrl = environment.apiUrl + '/checkExistUsername';

  constructor(private http: HttpClient) {
  }

  updateUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.updateUserUrl}/${id}`, data, this.httpJson);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }

  checkExistUser(username: string): Observable<any> {
    return this.http.post<UpdateInfo>(this.apiCheckExistUserUrl, {username: username});
  }
}
