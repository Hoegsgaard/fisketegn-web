import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage = "Dansk"

  constructor(
    public auth : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  goToLink(link: string){
    window.open(link, "_blank");
  }

  changeLanguage(language: string){
    this.selectedLanguage = language
    console.log(language)
  }

  onLogoutClick(){
    this.auth.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
