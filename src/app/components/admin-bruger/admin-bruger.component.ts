import { Component, HostListener, OnInit } from '@angular/core';
import { FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'
import { AdminService } from '../../services/admin.service'
import { FormControl, FormGroup} from '@angular/forms';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ValidateService } from '../../services/validate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-bruger',
  templateUrl: './admin-bruger.component.html',
  styleUrls: ['./admin-bruger.component.scss']
})
export class AdminBrugerComponent implements OnInit {
  
  selectedLicense:any;
  closeResult = '';
  selectedCountry = "Danmark";
  selectedRole = "User";
  res:any;
  in:any; 
  editing = false;
  userFound = false;
  firstnamePH = "n/a";
  lastnamePH = "n/a";
  cprPH = "n/a";
  emailPH = "n/a";
  addressPH = "n/a";
  zipcodePH = "n/a";
  rolePH = "n/a";
  "user": Object;
  licenseList:any;
  scrWidth:any
  isCompact: any 
  form = new FormGroup({
    SearchUser: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl('Danmark'),
    CountryDisabled: new FormControl(''),
    Role: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    repNewPassword: new FormControl(''),
  });

  constructor(
    private auth : AuthService,
    private adminService : AdminService,
    private flash : FlashMessagesService,
    private modalService: NgbModal,
    private userService : UserService,
    private validateServide : ValidateService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getScreenSize()
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?:any) {
    this.scrWidth = window.innerWidth
    if(this.scrWidth < 1000){
      this.isCompact = true;
    }else{
      this.isCompact = false;
    }
  }

  serchUser() {
    this.getUser(this.form.value.SearchUser);
    this.getLicenses(this.form.value.SearchUser);
  }

  cancelSearch(){
    this.userFound = false;
    this.form.patchValue({SearchUser: ""})
  }

  getUser(usersemail: string){
    this.adminService.getUser(usersemail).subscribe(data => {
      this.userFound = true;
      console.log(data.body as any)
      this.res = (data.body as any);
      this.firstnamePH = this.res.firstName;
      this.lastnamePH = this.res.lastName;
      this.cprPH = this.res.cpr;
      this.emailPH = this.res.email;
      this.addressPH = this.res.address;
      this.zipcodePH = this.res.zipCode;
      this.rolePH = this.res.role.charAt(0).toUpperCase()+this.res.role.slice(1);
      this.disableForm();
    },
    err => {
      this.userFound = false;
      this.flash.show(`${this.translate.instant('FlashMsq.user')} ${this.form.value.SearchUser} ${this.translate.instant('FlashMsq.doesnt-exist')}`, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    })
  }

  getLicenses(usersemail: string){
    this.adminService.getUsersLicenses(usersemail).subscribe(data => {
      this.in = (data.body as any)
      this.licenseList = new Array
      this.in.forEach((element: { endDate: string; endDateNumber: number; type: string; deletedFlag: any; renewable: boolean; }) => {
        let endDate = element.endDate.split("/",3);
        element.endDateNumber = Date.parse(endDate[2]+"-"+endDate[1]+"-"+endDate[0]);
      });
      this.in.sort(function(a: { endDateNumber: number; },b: { endDateNumber: number; }){
        return b.endDateNumber - a.endDateNumber;
      })
      this.licenseList = this.in
    });
  }

  openLicense(content: any, license: any) {
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.selectedLicense = license;
  }

  openEditPop(content: any) {
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
    this.form.get('Role')?.disable();
    this.form.get('Role')?.setValue(this.res.role.charAt(0).toUpperCase()+this.res.role.slice(1));
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

  onEditRole(){
    const newRole = this.selectedRole.toLowerCase()
    this.adminService.editRole(this.form.value.SearchUser, newRole).subscribe(data => {
      this.flash.show(`${this.translate.instant('FlashMsq.users-role-is-now')} ${this.selectedRole}`, {cssClass: 'alert-success', timeout: 3000})
      this.getUser(this.form.value.SearchUser);
    })
  }

  changeCountry(language: string){
    this.selectedCountry = language
  }

  changeRole(role: string){
    this.selectedRole = role;
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
      country: formValue.Country ? formValue.Country : this.res.country,
      role: formValue.Role ? formValue.Role : this.res.role,
      oldEmail : formValue.SearchUser
    }
    if(!this.validateServide.validateUpdateUser(user, this.res)){
      this.flash.show(this.translate.instant('FlashMsq.fill-at-least-one'), {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.adminService.updateUser(user).subscribe(data => {  
      this.flash.show(this.translate.instant('FlashMsq.info-updated'), {cssClass: 'alert-success', timeout: 3000})
      this.getUser(this.form.value.SearchUser);
    }, err=> {
      this.flash.show(this.translate.instant('FlashMsq.something-went-wrong'), {cssClass: 'alert-danger', timeout: 3000})
      return false
    });
    return true;
  }

  onRefundLicense(license: any){
    this.adminService.refund(license).subscribe(data => {
      this.flash.show(this.translate.instant('FlashMsq.Fisketegn blev refunderet'), {cssClass: 'alert-success', timeout: 3000})
        this.getLicenses(this.form.value.SearchUser);
    }, err => {
      this.flash.show(this.translate.instant('FlashMsq.something-went-wrong'), {cssClass: 'alert-danger', timeout: 3000})
    })
  }
}