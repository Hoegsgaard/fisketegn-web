import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DatePipe} from '@angular/common';

// Import Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { buyLystfisketegnComponent } from './components/buyLystfisketegn/buyLystfisketegn.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { BuyFritidsfisketegnComponent } from './components/buyFritidsfisketegn/buyFritidsfisketegn.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';

// Import Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';

// Import Guards
import { AuthGuard } from './guards/auth.guard';
import { TwoTypsOfLicenseComponent } from './components/two-typs-of-license/two-typs-of-license.component';




const appRoutes: Routes =[
  {path: '', component: LandingpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buyLystfisketegn', component: buyLystfisketegnComponent},
  {path: 'buyFritidsfisketegn', component: BuyFritidsfisketegnComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'twoTyps', component: TwoTypsOfLicenseComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    buyLystfisketegnComponent,
    LandingpageComponent,
    ProfileComponent,
    BuyFritidsfisketegnComponent,
    FooterComponent,
    HeaderComponent,
    HelpComponent,
    TwoTypsOfLicenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    NgbModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
