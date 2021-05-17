import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgForm, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-buyLystfisketegn',
  templateUrl: './buyLystfisketegn.component.html',
  styleUrls: ['./buyLystfisketegn.component.scss']
})
export class buyLystfisketegnComponent implements OnInit {
  form = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    BirthDay: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl(''),
    Type: new FormControl(''),
    HighQuality: new FormControl(''),
    StartDate: new FormControl(''),
    Password: new FormControl(''),
    gentagPassword: new FormControl('')
  });

  constructor(
    private validateServide: ValidateService,
    private auth : AuthService,
    private router : Router,
    private flash : FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  disableStartDate(){
    this.form.get('StartDate')?.disable();
    
  }

  enableStarteDate(){
    this.form.get('StartDate')?.enable();
  }

  onRegisterSubmit(){
    /*if(this.BirthDay == undefined || this.StartDate == undefined){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }*/

    /*const birthData = this.BirthDay.split('-')
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
      type: this.Type,
      highQuality: this.HighQuality ? true : false,
      startDate: `${startData[2]}/${startData[1]}/${startData[0]}`,
      password: this.Password,
      gentagPassword: this.gentagPassword
    }
    console.log(user)*/
   
    // Alle felter skal være udfyldt
    /*if(!this.validateServide.validateBuyLicense(user)){
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
        this.flash.show("Noget gik galt", {cssClass: 'alert-success', timeout: 3000});
        return false;
      }); 
      return true;
    }*/
  }
}
