import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  "user": Object;

  constructor(
    private router : Router,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      console.log(data)
    },
    err => {
      console.log(err);
      return false;
    })
  }

}
