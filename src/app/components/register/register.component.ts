import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  'CPR': String;
  'BirthDay' : String;
  'FirstName' : String;
  'LastName' : String;
  'Email' : String;
  'Address' : String;
  'ZipCode' : String;
  'Country' : String;
  'HighQuality' : String;
  'StartDate' : String;
  'Password' : String;
  'gentagPassword' : String;

  constructor(
    private validateServide: ValidateService,
    private auth : AuthService,
    private router : Router,
    private flash : FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    if(this.BirthDay == undefined || this.StartDate == undefined){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // TODO: Håndtering hvis højkvalitet ikke er valgt

    const birthData = this.BirthDay.split('-')
    const startData = this.StartDate.split('-')
    const user = {
      cpr: this.CPR,
      birthDay: birthData[2],
      birthMonth: birthData[1],
      birthYear: birthData[0],
      firstName: this.FirstName,
      lastName: this.LastName,
      email: this.Email,
      address: this.Address,
      zipCode: this.ZipCode,
      country: this.Country,
      type: "d", // TODO: SKAL SÆTTES EFTER BRUGERES VALG
      highQuality: this.HighQuality,
      startDate: `${startData[2]}/${startData[1]}/${startData[0]}`,
      password: this.Password,
      gentagPassword: this.gentagPassword,
      role: "admin" // TODO: SKAL SÆTTES I BACKENDEN
    }
   
    // Alle felter skal være udfyldt
    if(!this.validateServide.validateBuyLicense(user)){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } 

    if(!this.validateServide.validateEqualPassword(user)){
      this.flash.show('Password skal være ens', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if(!this.validateServide.validateSecurePassword(user.password)){
      this.flash.show('Password er ikke sikkert nok. Password skal mindst indeholde 10 tegen, både tal, store og små bokstaver', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(user.email)){
      this.flash.show('Email er ugyldig', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } else {
       // Buy License
      this.auth.buyLicense(user).subscribe(data => {
        this.flash.show(`${this.Email} er oprettet`, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }, err => {
        // TODO: Hent korrekte fejl fra respons
        this.flash.show("Noget gik falt", {cssClass: 'alert-success', timeout: 3000});
        return false;
      }); 
      return true;
    }
  }
}
