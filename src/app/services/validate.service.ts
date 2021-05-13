import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateBuyLicense(user: any){
    if(user.cpr == undefined ||
      user.birthDay == undefined ||
      user.birthMonth == undefined ||
      user.birthYear == undefined ||
      user.firstName == undefined ||
      user.lastName == undefined ||
      user.email == undefined ||
      user.address == undefined ||
      user.zipCode == undefined ||
      user.country == undefined ||
      user.type == undefined ||
      user.highQuality == undefined ||
      user.startDate == undefined ||
      user.password == undefined ||
      user.gentagPassword == undefined){
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
}


