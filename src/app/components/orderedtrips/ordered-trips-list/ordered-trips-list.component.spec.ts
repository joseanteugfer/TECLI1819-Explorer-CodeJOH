import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrderedTripsListComponent } from './ordered-trips-list.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../security/login/login.component';
import { RegisterComponent } from '../../security/register/register.component';
import { FooterComponent } from '../../master/footer/footer.component';
import { HeaderComponent } from '../../master/header/header.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TermsAndConditionsComponent } from '../../terms-and-conditions/terms-and-conditions.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { DeniedAccessPageComponent } from '../../denied-access-page/denied-access-page.component';
import { LocalizedDataPipe } from '../../shared/localized-data.pipe';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { of } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const firebaseConfig = {
  apiKey: 'AIzaSyBDPPdxUsnYcPMc4yUs2ZRQfkXXW0wZFKE',
  authDomain: 'acme-explorer-code-joh.firebaseapp.com',
  databaseURL: 'https://acme-explorer-code-joh.firebaseio.com',
  projectId: 'acme-explorer-code-joh',
  storageBucket: 'acme-explorer-code-joh.appspot.com',
  messagingSenderId: '513136153151'
};

fdescribe('OrderedTripsListComponent', () => {
  let component: OrderedTripsListComponent;
  let fixture: ComponentFixture<OrderedTripsListComponent>;
  let apiService: ApiService;
  let authService: AuthService;
  let originalTimeout;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        OrderedTripsListComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        HeaderComponent,
        DashboardComponent,
        TermsAndConditionsComponent,
        NotFoundComponent,
        DeniedAccessPageComponent,
        LocalizedDataPipe
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        RouterTestingModule,
        SharedModule,
        DataTablesModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [ TranslateService, AngularFireAuth ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    fixture = TestBed.createComponent(OrderedTripsListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
    spyOn(authService, 'getCurrentActor').and.returnValue({ _id: '5c9f5306bb7a48933ee85eb2'});
    spyOn(localStorage, 'getItem').and.returnValue('MANAGER');
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have correct number of ordered trips', async (done) => {
    expect(component.orderedTripsTratadas.length).toBe(0);
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(apiService, 'getOrderedTripsFromManager').and.returnValue(of(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.orderedTripsTratadas.length).toBeGreaterThan(1);
      done();
    });
  });
 */
});
