import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: any;

  constructor(
    private http : HttpClient,
  ) { }

  getUser(usersEmail: string){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.post('/camel/api/admin/getuser', {"email": usersEmail}, {headers: headers, observe: 'response'})
  }

  getUsersToken(){
    const token = localStorage.getItem('fiskeToken');
    this.token = token;
  } 
}