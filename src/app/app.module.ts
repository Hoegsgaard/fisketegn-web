import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { buyLystfisketegnComponent } from './components/buyLystfisketegn/buyLystfisketegn.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

// Import Services
import {ValidateService} from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';

// Import Guards
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes =[
  {path: '', component: LandingpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buyLystfisketegn', component: buyLystfisketegnComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    buyLystfisketegnComponent,
    LandingpageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
