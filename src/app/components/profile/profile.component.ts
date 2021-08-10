import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'
import { FormControl, FormGroup} from '@angular/forms';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ValidateService } from '../../services/validate.service';
import { TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from "@angular/cdk/a11y";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
 @ViewChild('firstName', {static:false})
 public firstNameInput!:ElementRef; 

 @ViewChild('editButton', {static:false})
 public editButton!:ElementRef; 

 @ViewChild('renewButton', {static:false})
 public renewButton!:ElementRef; 

  selectedLicense:any;
  closeResult = '';
  selectedCountry = "Danmark"
  res:any
  in:any 
  editing = false
  firstnamePH = "n/a"
  lastnamePH = "n/a"
  cprPH = "n/a"
  emailPH = "n/a"
  addressPH = "n/a"
  zipcodePH = "n/a"
  "user": Object;
  scrWidth:any
  isCompact: any 
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
  licenseList:any

  constructor(
    private auth : AuthService,
    private flash : FlashMessagesService,
    private modalService: NgbModal,
    private userService : UserService,
    private validateServide : ValidateService,
    private translate: TranslateService,
    private announcer: LiveAnnouncer
  ) { }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?:any) {
    this.scrWidth = window.innerWidth
    if(this.scrWidth < 1000){
      this.isCompact = true;
    }else{
      this.isCompact = false;
    }
  }

  ngOnInit(): void {
    this.getUser();
    this.getLicenses();
    this.getScreenSize();
  }
  getUser(){
    this.auth.getUser().subscribe(data => {   
      this.res = (data.body as any)
      this.firstnamePH = this.res.firstName;
      this.lastnamePH = this.res.lastName;
      this.cprPH = this.res.cpr;
      this.emailPH = this.res.email;
      this.addressPH = this.res.address;
      this.zipcodePH = this.res.zipCode;

      this.disableForm();
    },
    err => {
      return false;
    })
  }

  getLicenses(){
  this.auth.getLicenses().subscribe(data => {
    this.in = (data.body as any)
    this.licenseList = new Array
    let today = new Date()
    this.in.forEach((element: { endDate: string; endDateNumber: number; type: string; deletedFlag: any; renewable: boolean; }) => {
      let endDate = element.endDate.split("/",3);
      element.endDateNumber = Date.parse(endDate[2]+"-"+endDate[1]+"-"+endDate[0]);
      if((element.endDateNumber.valueOf() - today.valueOf())/(1000 * 3600 * 24) <= 30 && (element.endDateNumber.valueOf() - today.valueOf())/(1000 * 3600 * 24) > 0 && (element.type == "y" || element.type == "f") && !element.deletedFlag){
        element.renewable = true;
        
      }else{
        element.renewable = false;
      }
      
    });

    this.in.sort(function(a: { endDateNumber: number; },b: { endDateNumber: number; }){
      return b.endDateNumber - a.endDateNumber;
    })
    this.licenseList = this.in
  });
  }

  openLicense(content: any, license: any) {
    console.log("opening log", license.licenseNumber)
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    setTimeout(()=>{
      this.renewButton.nativeElement.focus();
    }, 10)
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.selectedLicense = license;
  }
  open(content: any) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
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

  getLicenseDescription(license: any){
    let description = ""
    description += (this.translate.instant('LicenseLabels.number') + ": " + license.licenseNumber + ".\n")
    description += (this.translate.instant('LicenseLabels.start') + ": " + license.startDate + ".\n")
    description += (this.translate.instant('LicenseLabels.expiration') + ": " + license.endDate + ".\n")
    switch(license.type){
      case "d":{
        description += (this.translate.instant('LicenseLabels.type') + ": " + this.translate.instant('LicenseLabels.angler-day') + ".\n")
        break;
      }
      case "w":{
        description += (this.translate.instant('LicenseLabels.type') + ": " + this.translate.instant('LicenseLabels.angler-week') + ".\n")
        break;
      }
      case "y":{
        description += (this.translate.instant('LicenseLabels.type') + ": " + this.translate.instant('LicenseLabels.angler-year') + ".\n")
        break;
      }
      case "f":{
        description += (this.translate.instant('LicenseLabels.type') + ": " + this.translate.instant('LicenseLabels.hobby') + ".\n")
        break;
      }
    }

    if(license.deletedFlag){
      description += (this.translate.instant('LicenseLabels.status') + ": " + this.translate.instant('LicenseLabels.deleted') + ".\n")
    }else if(license.status){
      description += (this.translate.instant('LicenseLabels.status') + ": " + this.translate.instant('LicenseLabels.active') + ".\n")
    }else{
      description += (this.translate.instant('LicenseLabels.status') + ": " + this.translate.instant('LicenseLabels.inactive') + ".\n")
    }

    if(license.renewable){
      description += (this.translate.instant('LicenseLabels.isRenewable'))
    }

    return description
  }

  cancel(){
    this.disableForm()
    setTimeout(() => {this.editButton.nativeElement.focus()}, 10)
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
    this.form.get('CountryDisabled')?.setValue(this.res.country);
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
    this.firstNameInput.nativeElement.focus();
  }

  changeCountry(language: string){
    this.selectedCountry = language
  }

  onUpdateUser(){
    let formValue = this.form.value;

    const user = {
      cpr: formValue.CPR ? formValue.CPR : this.res.cpr,
      firstName: formValue.FirstName ? formValue.FirstName : this.res.firstName,
      lastName: formValue.LastName ? formValue.LastName : this.res.lastName,
      email: formValue.Email ? formValue.Email : this.res.email,
      address: formValue.Address ? formValue.Address : this.res.address,
      zipCode: formValue.ZipCode ? formValue.ZipCode : this.res.zipCode,
      country: formValue.Country ? formValue.Country : this.res.country
    }
    if(!this.validateServide.validateUpdateUser(user, this.res)){
      const message = this.translate.instant('FlashMsq.fill-at-least-one')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000}); 
      return false;
    }
    this.auth.updateUser(user).subscribe(data => {
      const message = this.translate.instant('FlashMsq.info-updated')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-success', timeout: 3000}); 
      this.getUser();
    }, err=> {
      const message = this.translate.instant('FlashMsq.something-went-wrong')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000}); 
      return false
    });

    return true;
  }

  onRenewLicense(license: any){
    this.auth.renewLicense({licenseID: license}).subscribe(data => {
      const message = this.translate.instant('FlashMsq.license-renewed')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-success', timeout: 3000}); 
      this.getLicenses();
    }) 
  }

  onDeleteUser(){
    this.userService.deleteUser().subscribe(data => {
      this.auth.logout();
    });
  }

  onRegisterNewPassword(){
    const updatePassword ={
      oldPassword : this.form.value.oldPassword,
      password : this.form.value.newPassword,
      gentagPassword : this.form.value.repNewPassword
    }

    // Valider at alle felter er udfyldt
    if(!this.validateServide.validateUpdatePassword(updatePassword)){
      const message = this.translate.instant('FlashMsq.all-fields-requred')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000}); 
      return false;
    }

    // Vlider at de indtastede passorews er ens
    if(!this.validateServide.validateEqualPassword(updatePassword)){
      const message = this.translate.instant('FlashMsq.password-must-match')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000}); 
      return false;
    }

    // Valider at password er sikkert
    if(!this.validateServide.validateSecurePassword(updatePassword.password)){
      const message = this.translate.instant('FlashMsq.password-must-be-safe')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Opdater Password
    const update ={
      oldPassword: this.form.value.oldPassword,
      password : this.form.value.newPassword
    }
    this.userService.updatePassword(update).subscribe(data => {   
      this.getUser()
      const message = this.translate.instant('FlashMsq.password-changed')
      this.announcer.announce(message, "assertive");
      this.flash.show(message, {cssClass: 'alert-success', timeout: 3000}); 
    }, err => {
      switch(err.status) { 
        case 401: { 
          const message = this.translate.instant('FlashMsq.old-password-wrong')
          this.announcer.announce(message, "assertive");
          this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000});  
          break; 
        } 
        default: { 
          const message = this.translate.instant('FlashMsq.something-went-wrong')
          this.announcer.announce(message, "assertive");
          this.flash.show(message, {cssClass: 'alert-danger', timeout: 3000}); 
          break; 
        } 
      } 
    })
    return true;
  }
}

