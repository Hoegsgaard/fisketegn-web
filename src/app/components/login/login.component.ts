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
    this.auth.authenticateUser(user).subscribe(data => {
      console.log(data)
    })
  }

}
