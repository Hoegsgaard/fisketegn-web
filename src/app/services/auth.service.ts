import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;


  constructor(private http : HttpClient) { }

  buyLicemse(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/camel/api/license', user, {headers: headers})
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/camel/api/auth/login', user, {headers: headers, observe: 'response' }) 
  }

  isLoggedIn(){
    this.getUsersToken()
    return !jwtHelper.isTokenExpired(this.token)
  }

  logout(){
    this.token = null;
    console.log()
    localStorage.removeItem('fiskeToken');
  }

  getUser(){
    this.getUsersToken();
    let headers = new HttpHeaders();
    headers.append('fiskeToken', this.token);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/camel/api/user/', {headers: headers, observe: 'response'})
  }  

  storeToken(token: any){
    this.token = token;
    localStorage.setItem('fiskeToken', token)
  }

  getUsersToken(){
    const token = localStorage.getItem('fiskeToken');
    this.token = token;
  }  
}
