import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip.component';
import { OrderedTripComponent } from './components/ordered-trip/ordered-trip.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/master/header/header.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { ApiService } from './services/api.service';
import { LocalizedDataPipe } from './components/shared/localized-data.pipe';
import { registerLocaleData } from '@angular/common';
import locales from '@angular/common/locales/es';
import { TripDisplayComponent } from './components/trip-display/trip-display.component';
import { TripCreateComponent } from './components/trip-create/trip-create.component';
import { TripEditComponent } from './components/trip-edit/trip-edit.component';
import { TripDeleteComponent } from './components/trip-delete/trip-delete.component';
import { SponsorshipComponent } from './components/sponsorship/sponsorship.component';
import { OrderedTripEditComponent } from './components/ordered-trip-edit/ordered-trip-edit.component';
import { DashboardTripPerManagerComponent } from './components/dashboard-trip-per-manager/dashboard-trip-per-manager.component';
import { DashboardOrderedTripsPerTripComponent } from './components/dashboard-ordered-trips-per-trip/dashboard-ordered-trips-per-trip.component';
import { DashboardPricePerTripComponent } from './components/dashboard-price-per-trip/dashboard-price-per-trip.component';
import { DashboardOrderedTripsByStatusComponent } from './components/dashboard-ordered-trips-by-status/dashboard-ordered-trips-by-status.component';
import { DashboardPriceInFindersComponent } from './components/dashboard-price-in-finders/dashboard-price-in-finders.component';
import { DashboardTopKeywordsComponent } from './components/dashboard-top-keywords/dashboard-top-keywords.component';
import { SettingEditComponent } from './components/setting-edit/setting-edit.component';
import { SettingComponent } from './components/setting/setting.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';

export const firebaseConfig = {
    apiKey: "AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE",
    authDomain: "acme-explorer-code-joh.firebaseapp.com",
    databaseURL: "https://acme-explorer-code-joh.firebaseio.com",
    projectId: "acme-explorer-code-joh",
    storageBucket: "acme-explorer-code-joh.appspot.com",
    messagingSenderId: "513136153151"
}

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    OrderedTripComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    TranslatableComponent,
    LocalizedDataPipe,
    TripDisplayComponent,
    TripCreateComponent,
    TripEditComponent,
    TripDeleteComponent,
    SponsorshipComponent,
    OrderedTripEditComponent,
    DashboardTripPerManagerComponent,
    DashboardOrderedTripsPerTripComponent,
    DashboardPricePerTripComponent,
    DashboardOrderedTripsByStatusComponent,
    DashboardPriceInFindersComponent,
    DashboardTopKeywordsComponent,
    SettingEditComponent,
    SettingComponent,
    TermsAndConditionsComponent,
    NotFoundComponent,
    ProfileDisplayComponent,
    ProfileEditComponent,
    ProfileComponent,
    DeniedAccessPageComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    AuthService,
    ApiService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
