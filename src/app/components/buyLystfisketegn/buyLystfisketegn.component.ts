import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

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
    Type: new FormControl('y'),
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
    this.disableStartDate();
  }

  disableStartDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.form.get('StartDate')?.disable();
    this.form.get('StartDate')?.setValue(yyyy + '-' + mm + '-' + dd)
  }

  enableStarteDate(){
    this.form.get('StartDate')?.enable();
  }

  onRegisterSubmit(){
    let fv = this.form.value;
    console.log(fv.StartDate)

    if(fv.BirthDay == undefined || 
      fv.BirthDay == "" || 
      fv.StartDate == undefined ||
      fv.StartDate == ""){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const birthData = this.form.get("BirthDay")?.value.split('-')
    const startData = this.form.get("StartDate")?.value.split('-')

    const user = {
      cpr: this.form.get('CPR')?.value,
      birthDay: birthData[2],
      birthMonth: birthData[1],
      birthYear: birthData[0],
      firstName: this.form.get('FirstName')?.value,
      lastName: this.form.get('LastName')?.value,
      email: this.form.get('Email')?.value,
      address: this.form.get('Address')?.value,
      zipCode: this.form.get('ZipCode')?.value,
      country: this.form.get('Country')?.value,
      type: this.form.get('Type')?.value,
      highQuality: this.form.get('HighQuality')?.value ? true : false,
      startDate: `${startData[2]}/${startData[1]}/${startData[0]}`,
      password: this.form.get('Password')?.value,
      gentagPassword: this.form.get('gentagPassword')?.value
    }

    console.log(user)

    // Alle felter skal være udfyldt
    if(!this.validateServide.validateBuyLicense(user)){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    if(!this.validateServide.validateZipcode(user.zipCode)){
      this.flash.show('Postnummer skal være på 4 tal', {cssClass: 'alert-danger', timeout: 3000});
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
        this.flash.show(`${user.email} er oprettet`, {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }, err => {
        this.flash.show("Noget gik galt", {cssClass: 'alert-success', timeout: 3000});
        return false;
      }); 
      return true;
    }
  }
}
