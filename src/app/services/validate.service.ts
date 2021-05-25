import { Injectable } from '@angular/core';
import { ZipOperator } from 'rxjs/internal/observable/zip';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateBuyLicense(user: any){
    if(user.cpr == "" ||
      user.cpr == null ||
      user.birthDay == "" ||
      user.birthMonth == "" ||
      user.birthYear == "" ||
      user.firstName == "" ||
      user.lastName == "" ||
      user.email == "" ||
      user.address == "" ||
      user.zipCode == "" ||
      user.country == "" ||
      user.type == "" ||
      user.startDate == "" ||
      user.password == "" ||
      user.gentagPassword == ""){
        return false;
      } else {
        return true
      }
  }

  validateUpdateUser(user: any, originalUser: any){
    if(user.cpr == originalUser.cpr &&
      user.firstName == originalUser.firstName &&
      user.lastName == originalUser.lastName &&
      user.address == originalUser.address &&
      user.email == originalUser.email &&
      user.zipCode == originalUser.zipCode &&
      user.country == originalUser.country){
      return false;
    }else{
      return true;
    }
  }

  validateUpdatePassword(updatePassword: any){
    if(updatePassword.oldPassword == "" ||
    updatePassword.oldPassword == undefined ||
      updatePassword.password == "" ||
      updatePassword.password == undefined ||
      updatePassword.gentagPassword == "" ||
      updatePassword.gentagPassword == undefined){
        return false;
      } else {
        return true
      }
  }

  validateEqualPassword(user : any){
    if(user.password == user.gentagPassword){
      return true;
    } else {
      return false;
    }
  }

  validateSecurePassword(password : any){
    // More then 10 chars, at least one number and uppercase letter
    const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{10,}$/;
    return re.test(String(password))
  }

  validateEmail(email: any){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  }

  validatelogIn(email: any, password : any){
    if(email == undefined ||
      email == "" ||
      password == undefined ||
      password == ""){
        return false;
      } else {
        return true
      }
  }

  validateZipcode(zip: any){
    const re = /^\d{4}$/
    if(re.test(zip)){
      return true;
    } else {
      return false;
    }
  }

  validateCPR(cpr: any){
    const re = /^\d{10}$/;
    if(re.test(cpr)){
      return true;
    } else {
      return false;
    }
  }
}