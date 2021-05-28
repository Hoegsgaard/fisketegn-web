import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { TranslateService } from '@ngx-translate/core';


const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;


  constructor(
    private http : HttpClient,
    private router : Router,
    private flash : FlashMessagesService,
    private translate: TranslateService
    ) { }

  buyLicense(user: any){
    let headers = new HttpHeaders({
    'Content-Type':'application/json'});  
    return this.http.post('/camel/api/license', user, {headers: headers, observe: 'response'})
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'});
    return this.http.post('/camel/api/auth/login', user, {headers: headers, observe: 'response'}) 
  }

  isLoggedIn(){
    this.getUsersToken()
    return !jwtHelper.isTokenExpired(this.token) 
  }

  isAdmin(){
    this.getUsersToken()
    return jwtHelper.decodeToken(this.token).role == 'admin'
  }

  logout(){
    this.token = null;
    localStorage.removeItem('fiskeToken');
    this.router.navigate(['/login']);
  }

  autoLogout(){
    this.getUsersToken();
    let expire =jwtHelper.getTokenExpirationDate(this.token)!.getTime();
    let today = new Date;
    expire = expire - today.getTime();
    setTimeout(()=>{
      this.logout();
      this.flash.show(this.translate.instant('FlashMsq.auto-logout'), {cssClass: 'alert-primary', timeout: 3000});
    }, expire)
  }

  getLicenses(){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.get('/camel/api/user/license/', {headers: headers, observe: 'response'})
  }

  getUser(){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return this.http.get('/camel/api/user/', {headers: headers, observe: 'response'})
  }
  
  updateUser(user: any){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
      return this.http.put('/camel/api/user', user, {headers: headers, observe: 'response'})
  }

  renewLicense(license: any){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
      return this.http.put('/camel/api/license', license, {headers: headers, observe: 'response'})
  }

  storeToken(token: any){
    this.token = token;
    localStorage.setItem('fiskeToken', token)
  }

  getUsersToken(){
    const token = localStorage.getItem('fiskeToken');
    this.token = token;
  }
  
  async getUserRole(){
    this.getUsersToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'fiskeToken':this.token});
    return await this.http.post('/camel/api/auth/validateToken','', {headers: headers, observe: 'response'}).pipe(
      map(res => {
        const role = jwtHelper.decodeToken(this.token).role
        return role;
      })
    ).toPromise().catch(e => console.log(e))
  }
}
