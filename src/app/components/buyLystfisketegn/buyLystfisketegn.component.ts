import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-buyLystfisketegn',
  templateUrl: './buyLystfisketegn.component.html',
  styleUrls: ['./buyLystfisketegn.component.scss']
})

export class buyLystfisketegnComponent implements OnInit {
  loading= false;
  selectedCountry = "Danmark"
  form = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    BirthDay: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl('Danmark'),
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
    private flash : FlashMessagesService,
    ) {}
  ngOnInit(): void {
    this.disableStartDate();
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

  onRegisterSubmit(){
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
        this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
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

    // Valider at alle felter er udfyldt
    if(!this.validateServide.validateBuyLicense(user)){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Valider at CPR nummer indeholder 10 tegn
    if(!this.validateServide.validateCPR(user.cpr)){
      this.flash.show('CPR nummer skal indeholde 10 tal', {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }
    
    // Valider at postnummer indeholder 4 tegn
    if(!this.validateServide.validateZipcode(user.zipCode)){
      this.flash.show('Postnummer skal være på 4 tal', {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Vlider at de indtastede passorews er ens
    if(!this.validateServide.validateEqualPassword(user)){
      this.flash.show('Password skal være ens', {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    }

    // Valider at password er sikkert
    if(!this.validateServide.validateSecurePassword(user.password)){
      this.flash.show('Password er ikke sikkert nok. Password skal mindst indeholde 10 tegen, både tal, store og små bokstaver', {cssClass: 'alert-danger', timeout: 10000});
      this.loading = false;
      return false;
    }

    // Validate Email by regex
    if(!this.validateServide.validateEmail(user.email)){
      this.flash.show('Email er ugyldig', {cssClass: 'alert-danger', timeout: 3000});
      this.loading = false;
      return false;
    } 

    // Buy License
    this.auth.buyLicense(user).subscribe(data => {
      const res = (data as any);
      this.flash.show(`Fisketegn oprettet`, {cssClass: 'alert-success', timeout: 3000});
      this.auth.storeToken(res.body.token)
      this.router.navigate(['/profile']) 
    }, err => {
      switch(err.status) {
        case 401: { 
          this.flash.show("Email og password stemmer ikke over ens", {cssClass: 'alert-danger', timeout: 3000}); 
          break; 
        } 
        default: { 
          this.flash.show("Noget gik galt, prøv igen", {cssClass: 'alert-danger', timeout: 3000});
          break; 
        } 
      }
      this.loading = false; 
    }); 
    return true;
  }
}
