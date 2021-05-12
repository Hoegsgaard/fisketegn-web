import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  "email": String;
  "password": String;

  constructor(
    private auth : AuthService,
    private router : Router,
    private validateServide : ValidateService,
    private flash : FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      "email": this.email,
      "password": this.password
    }
    
    // Alle felter skal være udfyldt
    if(!this.validateServide.validatelogIn(this.email, this.password)){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(this.email)){
      this.flash.show('Email er ugyldig', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
      this.auth.authenticateUser(user).subscribe(data => {
        const res = (data as any);
          this.flash.show(`${this.email} er logget ind`, {cssClass: 'alert-success', timeout: 3000});
          this.auth.storeToken(res.body.token)
          this.router.navigate(['/profile'])     
      }, err =>{
        this.flash.show("Incorrect username or password", {cssClass: 'alert-danger', timeout: 3000});
      });
      return true;
    }
  }
}
