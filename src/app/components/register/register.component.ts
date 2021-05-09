import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  'CPR': String;
  'BirthDay' : String;
  'FirstName' : String;
  'LastName' : String;
  'Email' : String;
  'Address' : String;
  'ZipCode' : String;
  'Country' : String;
  'HighQuality' : String;
  'StartDate' : String;
  'Password' : String;

  constructor(
    private validateServide: ValidateService,
    private auth : AuthService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    if(this.BirthDay == undefined || this.StartDate == undefined){
      console.log("Alle felter skal udfyldes");
      return false;
    }

    const birthData = this.BirthDay.split('-')
    const startData = this.StartDate.split('-')
    const user = {
      cpr: this.CPR,
      birthDay: birthData[2],
      birthMonth: birthData[1],
      birthYear: birthData[0],
      firstName: this.FirstName,
      lastName: this.LastName,
      email: this.Email,
      address: this.Address,
      zipCode: this.ZipCode,
      country: this.Country,
      type: "d", // TODO: SKAL SÆTTES EFTER BRUGERES VALG
      highQuality: this.HighQuality,
      startDate: `${startData[2]}/${startData[1]}/${startData[0]}`,
      password: this.Password,
      role: "admin" // TODO: SKAL SÆTTES I BACKENDEN
    }
   
    // Alle felter skal være udfyldt
    if(!this.validateServide.validateBuyLicense(user)){
      // TODO: Besked til brugeren
      console.log("Alle felter skal udfyldes")
      return false
    } 

    // Valider de to password felter er ens

    // Validate Email by regex
    if(!this.validateServide.validateEmail(user.email)){
      console.log("Email ugyldig")
      return false
    } else {
       // Buy License
      this.auth.buyLicemse(user).subscribe(data => {
        // TODO: Validering om det er gået godt
        // TODO: Besked til brugeren om det er gået godt eller skidt        
        console.log(data)
        this.router.navigate(['/login']);
      });
      return true
    }
  }
}
