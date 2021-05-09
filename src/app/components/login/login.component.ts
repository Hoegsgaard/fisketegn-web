import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

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
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      "email": this.email,
      "password": this.password
    }
    // TODO: Valider felter er udfyldt
    
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
    })
  }

}
