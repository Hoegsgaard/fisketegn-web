import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage = "Dansk"
  sysLang = "da"

  constructor(
    public auth : AuthService,
    private router : Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('da');
    translate.addLangs(['en', 'de']);
   }

  ngOnInit(): void {
    
  }

  goToLink(link: string){
    window.open(link, "_blank");
  }

  changeLanguage(language: string){
    if(language == "Dansk"){
      this.selectedLanguage = 'Dansk';
      this.sysLang = "da";
    }else if(language == 'English'){
      this.selectedLanguage = 'English';
      this.sysLang = "en";
    }else if(language == 'Deutch'){
      this.selectedLanguage = 'Deutch';
      this.sysLang = "de";
    }
    this.translate.use(this.sysLang);
    console.log(language)
  }


  onLogoutClick(){
    this.auth.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
