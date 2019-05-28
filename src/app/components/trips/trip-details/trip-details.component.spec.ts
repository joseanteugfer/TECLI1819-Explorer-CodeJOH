import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';

import { TripDetailsComponent } from './trip-details.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Injector, Injectable, DebugElement } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { HeaderComponent } from '../../master/header/header.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TermsAndConditionsComponent } from '../../terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { DeniedAccessPageComponent } from '../../denied-access-page/denied-access-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocalizedDataPipe } from '../../shared/localized-data.pipe';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RegisterManagerComponent } from '../../security/register-manager/register-manager.component';
import { tick } from '@angular/core/src/render3';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutComponent } from '../../checkout/checkout.component';
import { NgxPayPalModule } from 'ngx-paypal';

export const firebaseConfig = {
  apiKey: 'AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE',
  authDomain: 'acme-explorer-code-joh.firebaseapp.com',
  databaseURL: 'https://acme-explorer-code-joh.firebaseio.com',
  projectId: 'acme-explorer-code-joh',
  storageBucket: 'acme-explorer-code-joh.appspot.com',
  messagingSenderId: '513136153151'
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

fdescribe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;
  let injector: Injector;
  let translate: TranslateService;
  let apiService: ApiService;
  let authService: AuthService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        TripDetailsComponent,
        LoginComponent,
        RegisterComponent,
        RegisterManagerComponent,
        FooterComponent,
        HeaderComponent,
        DashboardComponent,
        TermsAndConditionsComponent,
        NotFoundComponent,
        DeniedAccessPageComponent,
        LocalizedDataPipe,
        CheckoutComponent
      ],
      imports: [
        HttpClientModule,
        NgxPayPalModule,
        AngularFireModule.initializeApp(firebaseConfig),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        AppRoutingModule,
        SharedModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [ApiService, AngularFireAuth, AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    translate = injector.get(TranslateService);
    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould be a Paris trip', fakeAsync((done) => {
    const trip = [{
      title: 'Paris',
      date_start: '2019-07-11',
      date_end: '2019-08-13',
      description: 'New trip to Paris',
      price: '',
      status: 'PUBLISHED',
    }];
    const actor = [{_id: '5ca23b50f328122c42ebf589'}];
    spyOn(apiService, 'getTrip').and.returnValue(of(trip));
    spyOn(authService, 'getCurrentActor').and.returnValue(of(actor));
    component.id = '5ca23b50f328122c42ebf589';
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const tripName = component.trip.title;
      expect(tripName).toEqual('Paris');
      expect(apiService.getTrip).toHaveBeenCalled();
      done();
    });
  }));

  it('should apply for a trip', fakeAsync((done) => {
    const trip = [{
      title: 'Paris',
      date_start: '2019-07-11',
      date_end: '2019-08-13',
      description: 'New trip to Paris',
      price: '',
      status: 'PUBLISHED'
    }];
    const actor = [{
      _id: '5ca23b50f328122c42ebf589',
      role: ['EXPLORER']
    }];
    spyOn(apiService, 'getTrip').and.returnValue(of(trip));
    spyOn(authService, 'getCurrentActor').and.returnValue(of(actor));
    component.id = '5ca23b50f328122c42ebf589';
    component.ngOnInit();
    component.applyTrip(trip);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.applicationDone).toBeTruthy();
      expect(apiService.getTrip).toHaveBeenCalled();
      expect(apiService.createOrderedTrip).toHaveBeenCalled();
      done();
    });
  }));

});
