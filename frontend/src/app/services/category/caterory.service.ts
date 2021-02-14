import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Category} from "../../model/category/category";
import {Singer} from "../../model/singer/singer";
import {Song} from "../../model/song/song";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiGetAllCategories = environment.apiUrl + '/category/list';
  apiGetCategoryInfo = environment.apiUrl + '/category';
  apiCreateCategory = environment.apiUrl + '/category/create';

  token = window.localStorage.getItem(TOKEN_KEY);
  httpJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<Song> {
    return this.http.post<Song>(this.apiCreateCategory, category, this.httpJson);
  }

  getCategoryInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiGetCategoryInfo}/${id}`, this.httpJson);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiGetAllCategories, this.httpJson);
  }
}
