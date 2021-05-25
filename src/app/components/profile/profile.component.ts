import { Component, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'
import { FormControl, FormGroup} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ValidateService } from '../../services/validate.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  closeResult = '';
  selectedCountry = "Danmark"
  res:any
  editing = false
  firstnamePH = "n/a"
  lastnamePH = "n/a"
  cprPH = "n/a"
  emailPH = "n/a"
  addressPH = "n/a"
  zipcodePH = "n/a"
  "user": Object;
  form = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl('Danmark'),
    CountryDisabled: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    repNewPassword: new FormControl(''),
  });

  constructor(
    private auth : AuthService,
    private flash : FlashMessagesService,
    private modalService: NgbModal,
    private userService : UserService,
    private validateServide : ValidateService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    this.auth.getUser().subscribe(data => {   
      this.res = (data.body as any)
      console.log(this.res)
      this.firstnamePH = this.res.firstName;
      this.lastnamePH = this.res.lastName;
      this.cprPH = this.res.cpr;
      this.emailPH = this.res.email;
      this.addressPH = this.res.address;
      this.zipcodePH = this.res.zipCode;
      //this.res = (data.body as any)
      //this.res = this.auth.getUser();

      this.disableForm();
    },
    err => {
      console.log(err);
      return false;
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  disableForm(){
    this.editing = false;
    this.form.get('FirstName')?.disable();
    this.form.get('FirstName')?.setValue(this.res?.firstName);
    this.form.get('LastName')?.disable();
    this.form.get('LastName')?.setValue(this.res?.lastName);
    this.form.get('CPR')?.disable();
    this.form.get('CPR')?.setValue(this.res?.cpr);
    this.form.get('Email')?.disable();
    this.form.get('Email')?.setValue(this.res?.email);
    this.form.get('Address')?.disable();
    this.form.get('Address')?.setValue(this.res?.address);
    this.form.get('ZipCode')?.disable();
    this.form.get('ZipCode')?.setValue(this.res.zipCode);
    this.form.get('CountryDisabled')?.disable();
    this.form.get('CountryDisabled')?.setValue(this.res.country)
  }

  getUserData(){

  }

  activateForm(){
    this.editing = true;
    this.form.get('FirstName')?.enable();
    this.form.get('FirstName')?.reset();
    this.form.get('LastName')?.enable();
    this.form.get('LastName')?.reset();
    this.form.get('CPR')?.enable();
    this.form.get('CPR')?.reset();
    this.form.get('Email')?.enable();
    this.form.get('Email')?.reset();
    this.form.get('Address')?.enable();
    this.form.get('Address')?.reset();
    this.form.get('ZipCode')?.enable();
    this.form.get('ZipCode')?.reset();
    this.form.get('CountryDisabled')?.enable();
    this.form.get('CountryDisabled')?.reset();

  }

  changeCountry(language: string){
    this.selectedCountry = language
    console.log(language)
  }




  onRegisterNewPassword(){
    const updatePassword ={
      oldPassword : this.form.value.oldPassword,
      password : this.form.value.newPassword,
      gentagPassword : this.form.value.repNewPassword
    }

    // Valider at alle felter er udfyldt
    if(!this.validateServide.validateUpdatePassword(updatePassword)){
      this.flash.show('Alle felter skal udfyldes', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Vlider at de indtastede passorews er ens
    if(!this.validateServide.validateEqualPassword(updatePassword)){
      this.flash.show('Password skal være ens', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Valider at password er sikkert
    if(!this.validateServide.validateSecurePassword(updatePassword.password)){
      this.flash.show('Password er ikke sikkert nok. Password skal mindst indeholde 10 tegen, både tal, store og små bokstaver', {cssClass: 'alert-danger', timeout: 10000});
      return false;
    }

    // Opdater Password
    const update ={
      oldPassword: this.form.value.oldPassword,
      password : this.form.value.newPassword
    }
    this.userService.updatePassword(update).subscribe(data => {   
      this.getUser()
      this.flash.show("Password er ændret", {cssClass: 'alert-success', timeout: 3000}); 
    }, err => {
      switch(err.status) { 
        case 401: { 
          this.flash.show("Gammelt password er ikke korrekt", {cssClass: 'alert-danger', timeout: 3000}); 
          break; 
        } 
        default: { 
          this.flash.show("Noget gik galt, prøv igen", {cssClass: 'alert-danger', timeout: 3000});
          break; 
        } 
      } 
    })
    return true;
  }
}
