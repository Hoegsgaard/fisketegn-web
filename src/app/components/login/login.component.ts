import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';

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
    private validateServide : ValidateService
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
      // TODO: Besked til brugeren
      console.log("Alle felter skal udfyldes");
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(this.email)){
      console.log("Email ugyldig");
      return false;
    } else {
      this.auth.authenticateUser(user).subscribe(data => {
        if(data.status){
          // TODO: Fortæl at brugeren er logget ind
          console.log('Bruger er logget ind')
          this.auth.storeToken(data.body)
          this.router.navigate(['/profile'])
        } else{
          // TODO: Vis fejl til brugeren
          console.log("Fejl ved login")
        }
      });
      return true;
    }
  }
}
