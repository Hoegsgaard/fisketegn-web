import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  user: any;

  constructor(private http : HttpClient) { }

  buyLicemse(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/camel/api/license', user, {headers: headers})
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/camel/api/auth/login', user, {headers: headers})
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear;
  }
}
