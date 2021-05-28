import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;

  constructor(
    private http : HttpClient,
  ) { }

  updatePassword(update : any){
    this.getUsersToken()
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.put('/camel/api/user/updatePassword', update, {headers: headers, observe: 'response'})
  }

  deleteUser(){
  this.getUsersToken()
  let headers = new HttpHeaders({
    'Content-Type':'application/json',
    'fiskeToken':this.token});
  return this.http.delete('/camel/api/user', {headers: headers, observe: 'response'})
  }

  getUsersToken(){
    const token = localStorage.getItem('fiskeToken');
    this.token = token;
  }  
}
