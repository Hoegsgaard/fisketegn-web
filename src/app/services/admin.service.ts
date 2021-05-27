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

  getUsersLicenses(usersEmail: string){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.post('/camel/api/admin/getLicenses', {"email": usersEmail}, {headers: headers, observe: 'response'})
  }

  refund(licenseID: string){
    this.getUsersToken;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.put('/camel/api/admin/refund', {"licenseID": licenseID}, {headers: headers, observe: 'response'})
  }

  updateUser(user: any){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
      return this.http.put('/camel/api/admin/User', user, {headers: headers, observe: 'response'})
  }

  editRole(usersEmail: string, newRole: string){
    const req = {
      "email": usersEmail,
      "role": newRole
    }
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
      return this.http.put('/camel/api/admin/User/role', req, {headers: headers, observe: 'response'})
  }

  getUsersToken(){
    const token = localStorage.getItem('fiskeToken');
    this.token = token;
  } 
}