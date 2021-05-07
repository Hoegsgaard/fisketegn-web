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
      user.highQuality == undefined ||
      user.startDate == undefined ||
      user.password == undefined){
        return false;
      } else {
        return true
      }
  }

  validateEmail(email: any){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  }
}


