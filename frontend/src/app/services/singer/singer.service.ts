<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Singer} from "../../model/singer";
<<<<<<< HEAD
=======
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Singer} from "../../component/singer";
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

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
<<<<<<< HEAD
<<<<<<< HEAD

  constructor(private http: HttpClient) {
  }
=======
  constructor(private http: HttpClient) {}
>>>>>>> e69b538d68601004c425fe92b2324963dd22f113
=======

  constructor(private http: HttpClient) {
  }
>>>>>>> b26a701020202ac5aa1f1ec9552bfc805380cd98

  getAllSingers(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.apiGetAllSingers, this.httpJson);
  }
}
