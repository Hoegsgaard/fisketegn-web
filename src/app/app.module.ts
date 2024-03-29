import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { FlashMessagesModule } from 'angular2-flash-messages'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DatePipe} from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Import Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { buyLystfisketegnComponent } from './components/buyLystfisketegn/buyLystfisketegn.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { BuyFritidsfisketegnComponent } from './components/buyFritidsfisketegn/buyFritidsfisketegn.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HelpComponent } from './components/help/help.component';
import { TwoTypsOfLicenseComponent } from './components/two-typs-of-license/two-typs-of-license.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminBrugerComponent } from './components/admin-bruger/admin-bruger.component';

// Import Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';

// Import Guards
import { AuthGuard } from './guards/auth.guard';
import { UserRoleGuard } from './guards/user-role.guard';

import {A11yModule} from '@angular/cdk/a11y';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
  }

const appRoutes: Routes =[
  {path: '', component: LandingpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'buyLystfisketegn', component: buyLystfisketegnComponent},
  {path: 'buyFritidsfisketegn', component: BuyFritidsfisketegnComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'help', component: HelpComponent},
  {path: 'twoTyps', component: TwoTypsOfLicenseComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faq', component: FaqComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: 'adminbruger', component: AdminBrugerComponent, canActivate:[UserRoleGuard], data: {role: 'admin'}},
  {path: '**', redirectTo: '/404'}
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
    TwoTypsOfLicenseComponent,
    ContactComponent,
    FaqComponent,
    PageNotFoundComponent,
    AdminBrugerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
      })
  ],
  exports: [
    // CDK
    A11yModule,
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    UserRoleGuard,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
