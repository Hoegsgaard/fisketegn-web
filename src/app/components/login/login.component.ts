import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { TranslateService } from '@ngx-translate/core';

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
    private flash : FlashMessagesService,
    private translate: TranslateService
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
      this.flash.show(this.translate.instant('FlashMsq.all-fields-requred'), {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(this.email)){
      this.flash.show(this.translate.instant('FlashMsq.email-invalid'), {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
      this.auth.authenticateUser(user).subscribe(data => {
        const res = (data as any);
        this.auth.storeToken(res.body.token)
        this.auth.autoLogout();
        if(this.auth.isAdmin()){
          this.router.navigate(['/adminbruger'])  
        } else {
          this.router.navigate(['/profile'])  
        }    
      }, err =>{
        this.flash.show(this.translate.instant('FlashMsq.invalid-credentials'), {cssClass: 'alert-danger', timeout: 3000});
      });
      return true;
    }
  }
}
