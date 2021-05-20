import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selectedLanguage = "Dansk"

  constructor() { }

  ngOnInit(): void {
  }

  changeLanguage(language: string){
    this.selectedLanguage = language
    console.log(language)
  }

}
