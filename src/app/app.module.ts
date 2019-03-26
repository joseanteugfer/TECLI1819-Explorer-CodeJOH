import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActorComponent } from './components/actor/actor.component';

import { TripComponent } from './components/trip/trip.component';
import { OrderedTripComponent } from './components/ordered-trip/ordered-trip.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { HeaderComponent } from './components/master/header/header.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyNavComponent } from './components/master/my-nav/my-nav.component';
import { SharedModule } from './shared/shared.module'

export const firebaseConfig = {
    apiKey: "AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE",
    authDomain: "acme-explorer-code-joh.firebaseapp.com",
    databaseURL: "https://acme-explorer-code-joh.firebaseio.com",
    projectId: "acme-explorer-code-joh",
    storageBucket: "acme-explorer-code-joh.appspot.com",
    messagingSenderId: "513136153151"
}

@NgModule({
  declarations: [
    AppComponent,
    ActorComponent,
    TripComponent,
    OrderedTripComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MyNavComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    
  ],
  providers: [
    AuthService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
