import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Category} from "../../model/category/category";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiGetAllCategories = environment.apiUrl + '/categories/list';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  }

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiGetAllCategories, this.httpJson);
  }
}
