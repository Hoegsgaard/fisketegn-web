import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  "email": String;
  "password": String;

  @ViewChild('emailInput', {static:false})
  public emailInput!:ElementRef; 

  constructor(
    private auth : AuthService,
    private router : Router,
    private validateServide : ValidateService,
    private flash : FlashMessagesService,
    private translate: TranslateService,
    private announcer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.emailInput.nativeElement.focus();
    },10)
  }

  onLoginSubmit(){
    const user = {
      "email": this.email,
      "password": this.password
    }
    
    // Alle felter skal være udfyldt
    if(!this.validateServide.validatelogIn(this.email, this.password)){
      const message = this.translate.instant('FlashMsq.all-fields-requred')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(this.email)){
      const message = this.translate.instant('FlashMsq.email-invalid')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000});
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
        const message = this.translate.instant('FlashMsq.invalid-credentials')
        this.announcer.announce(message, "assertive");
        this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000});
      });
      return true;
    }
  }
}
