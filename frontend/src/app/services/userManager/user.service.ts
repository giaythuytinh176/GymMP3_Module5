import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UpdateInfo} from '../../model/userManager/updateinfo';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
      'Access-Control-Allow-Origin': '*',
    })
  };
  private getUserUrl = environment.apiUrl + '/user/token';
  private updateUserUrl = environment.apiUrl + '/user/update';
  private apiCheckExistUserUrl = environment.apiUrl + '/user/check-username';
  private apiRemoveToken = environment.apiUrl + '/user/remove-token';

  constructor(private http: HttpClient) {
  }

  removeToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.apiRemoveToken}`, {token});
  }

  updateUser(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.updateUserUrl}/${id}`, data, this.httpJson);
  }

  getInfoUserToken(): Observable<UpdateInfo> {
    return this.http.get<UpdateInfo>(this.getUserUrl, this.httpJson);
  }

  checkExistUser(username: string): Observable<any> {
    return this.http.post<UpdateInfo>(this.apiCheckExistUserUrl, {username});
  }
}
