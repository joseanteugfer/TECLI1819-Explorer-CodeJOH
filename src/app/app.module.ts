import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeniedAccessPageComponent } from './components/denied-access-page/denied-access-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE',
    authDomain: 'acme-explorer-code-joh.firebaseapp.com',
    databaseURL: 'https://acme-explorer-code-joh.firebaseio.com',
    projectId: 'acme-explorer-code-joh',
    storageBucket: 'acme-explorer-code-joh.appspot.com',
    messagingSenderId: '513136153151'
};

registerLocaleData(locales, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    TranslatableComponent,
    LocalizedDataPipe,
    TermsAndConditionsComponent,
    NotFoundComponent,
    DeniedAccessPageComponent,
    DashboardComponent
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
