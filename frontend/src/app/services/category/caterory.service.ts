import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiGetAllCategories = 'http://127.0.0.1:8000/api/categories/list';

  token = sessionStorage.getItem(TOKEN_KEY);
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
