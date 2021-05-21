import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedCountry = "Danmark"
  res:any
  editing = false
  firstname = ""
  "user": Object;
  form = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    CPR: new FormControl(''),
    Email: new FormControl(''),
    Address: new FormControl(''),
    ZipCode: new FormControl(''),
    Country: new FormControl('Danmark'),
    CountryDisabled: new FormControl('')
  });

  constructor(
    private router : Router,
    private auth : AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      //this.auth.saveUser(data.body)
      this.res = (data.body as any)
      console.log(this.res)
      this.firstname = this.res.firstName;
      //this.res = (data.body as any)
      //this.res = this.auth.getUser();
      this.disableForm();
    },
    err => {
      console.log(err);
      return false;
    })
    
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
    
    this.form.get('LastName')?.enable();
    this.form.get('CPR')?.enable();
    this.form.get('Email')?.enable();
    this.form.get('Address')?.enable();
    this.form.get('ZipCode')?.enable();
    this.form.get('CountryDisabled')?.enable();
  }

  changeCountry(language: string){
    this.selectedCountry = language
    console.log(language)
  }

}
