import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormControl, FormGroup} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-buyLystfisketegn',
  templateUrl: './buyLystfisketegn.component.html',
  styleUrls: ['./buyLystfisketegn.component.scss']
})

export class buyLystfisketegnComponent implements OnInit {
  loading= false;
  selectedCountry = "Danmark"
  res: any
  form = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    BirthDay: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl('Danmark'),
    CountryDisabled: new FormControl(''),
    Type: new FormControl('y'),
    HighQuality: new FormControl(''),
    StartDate: new FormControl(''),
    Password: new FormControl(''),
    gentagPassword: new FormControl('')
  });

  constructor(
    private validateServide: ValidateService,
    public auth : AuthService,
    private router : Router,
    private flash : FlashMessagesService,
    private translate: TranslateService
    ) {}
  ngOnInit(): void {
    this.disableStartDate();
    if(this.auth.isLoggedIn()){
      this.getUser()
    }
  }

  getUser(){
    this.auth.getUser().subscribe(data =>{
    this.res = (data.body as any)
    this.disableForm();
    this.form.get('FirstName')?.setValue(this.res?.firstName);
    this.form.get('LastName')?.setValue(this.res?.lastName);
    this.form.get('CPR')?.setValue(this.res?.cpr);
    this.form.get('Email')?.setValue(this.res?.email);
    this.form.get('Address')?.setValue(this.res?.address);
    this.form.get('ZipCode')?.setValue(this.res.zipCode);
    this.form.get('CountryDisabled')?.setValue(this.res.country)
  })
  }

  disableStartDate(){
    this.form.get('StartDate')?.disable();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.form.get('StartDate')?.setValue(yyyy + '-' + mm + '-' + dd)
    
    this.form.get('HighQuality')?.enable();

  }

  enableStarteDate(){
    this.form.get('StartDate')?.enable();
    this.form.get('HighQuality')?.disable();
    this.form.get('HighQuality')?.reset();
  }

  changeCountry(country : string){
    this.form.value.Country = country
    this.selectedCountry = country
  }

  activateForm(){
    this.form.get('FirstName')?.enable();
    this.form.get('LastName')?.enable();
    this.form.get('CPR')?.enable();
    this.form.get('Email')?.enable();
    this.form.get('Address')?.enable();
    this.form.get('ZipCode')?.enable();
    this.form.get('CountryDisabled')?.enable();
  }

  disableForm(){
    this.form.get('FirstName')?.disable();
    this.form.get('LastName')?.disable();
    this.form.get('CPR')?.disable();
    this.form.get('Email')?.disable();
    this.form.get('Address')?.disable();
    this.form.get('ZipCode')?.disable();
    this.form.get('CountryDisabled')?.disable();
  }

  onRegisterSubmit(){
    this.activateForm();
    this.loading = true;
    let formValue = this.form.value;

    // Valider at der er input i Startdate
    let startData = undefined;
    if(this.form.get('StartDate')?.disabled){
      this.form.get('StartDate')?.enable()
      startData = this.form.get("StartDate")?.value.split('-')
      this.form.get('StartDate')?.disable()
    } else {
      if(formValue.StartDate == undefined ||
      formValue.StartDate == ""){
        this.flash.show(this.translate.instant('FlashMsq.all-fields-requred'), {cssClass: 'alert-danger', timeout: 3000});
        this.loading = false;
        return false;
      }
      startData = this.form.get("StartDate")?.value.split('-')
    }

    // Lav en bruger baseret på inputs
    const user = {
      cpr: formValue.CPR,
      firstName: formValue.FirstName,
      lastName: formValue.LastName,
      email: formValue.Email,
      address: formValue.Address,
      zipCode: formValue.ZipCode,
      country: formValue.Country,
      type: formValue.Type,
      highQuality: formValue.HighQuality ? true : false,
      startDate: `${startData[2]}/${startData[1]}/${startData[0]}`,
      password: formValue.Password,
      gentagPassword: formValue.gentagPassword
    }
    this.disableForm();
    // Valider at alle felter er udfyldt
    if(!this.validateServide.validateBuyLicense(user)){
      this.flash.show(this.translate.instant('FlashMsq.all-fields-requred'), {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Valider at CPR nummer indeholder 10 tegn
    if(!this.validateServide.validateCPR(user.cpr)){
      this.flash.show(this.translate.instant('FlashMsq.cpr-ten-digts'), {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }
    
    // Valider at postnummer indeholder 4 tegn
    if(!this.validateServide.validateZipcode(user.zipCode)){
      this.flash.show(this.translate.instant('FlashMsq.zipcode-four-digts'), {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Vlider at de indtastede passorews er ens
    if(!this.validateServide.validateEqualPassword(user)){
      this.flash.show(this.translate.instant('FlashMsq.password-must-match'), {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Valider at password er sikkert
    if(!this.validateServide.validateSecurePassword(user.password)){
      this.flash.show(this.translate.instant('FlashMsq.password-must-be-safe'), {cssClass: 'alert-danger', timeout: 10000});
      this.loading = false;
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(user.email)){
      this.flash.show(this.translate.instant('FlashMsq.email-invalid'), {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    } 

    // Buy License
    this.auth.buyLicense(user).subscribe(data => {
      const res = (data as any);
      this.flash.show(this.translate.instant('FlashMsq.license-created'), {cssClass: 'alert-success', timeout: 3000});
      this.auth.storeToken(res.body.token);
      this.auth.autoLogout();
      this.router.navigate(['/profile']) 
    }, err => {
      switch(err.status) {
        case 401: { 
          this.flash.show(this.translate.instant('FlashMsq.invalid-credentials'), {cssClass: 'alert-danger', timeout: 3000}); 
          break; 
        } 
        default: { 
          this.flash.show(this.translate.instant('FlashMsq.something-went-wrong'), {cssClass: 'alert-danger', timeout: 3000});
          break; 
        } 
      }
      this.loading = false; 
    }); 
    return true;
  }
}
