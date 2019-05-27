import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataTablesModule } from 'angular-datatables';

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
import { of } from 'rxjs';

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
      providers: [TranslateService, AuthService, AngularFireAuth, ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const actor = [{
      _id: '5ca23b50f328122c42ebf589',
    }];
    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(OrderedTripsListComponent);
    component = fixture.componentInstance;
    spyOn(authService, 'getCurrentActor').and.returnValue(of(actor));
    component.orderedTripsTratadas = [];


    fixture.detectChanges();
  });

  afterEach(() => {
    component.orderedTripsTratadas = [];
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have correct number of ordered trips for manager', fakeAsync((done) => {
    expect(component.orderedTripsTratadas.length).toBe(0);

    const orderedTrips = [{
      status: 'PENDING',
      date_apply: '2018-04-12T00:00:00.000Z',
      _id: '5ca23b51f328122c42ebf926',
      ticker: '180405-MMTT',
      actor_id: '5ca23b51f328122c42ebf599',
      comments: 'Comment3'
    }];
    spyOn(apiService, 'getOrderedTripsFromManager').and.returnValue(of(orderedTrips));
    spyOn(localStorage, 'getItem').and.returnValue(of('MANAGER'));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.orderedTripsTratadas.length).toBe(1);
      expect(apiService.getOrderedTripsFromManager).toHaveBeenCalled();
      done();
    });
  }));

  it('should have correct number of ordered trips for explorer', fakeAsync((done) => {
    expect(component.orderedTripsTratadas.length).toBe(0);

    const orderedTrips = [{
      status: 'PENDING',
      date_apply: '2018-04-12T00:00:00.000Z',
      _id: '5ca23b51f328122c42ebf926',
      ticker: '180405-MMTT',
      actor_id: '5ca23b51f328122c42ebf599',
      comments: 'Comment3'
    }];
    spyOn(component, 'getOrderedTripsForExplorer').and.returnValue(of(orderedTrips));
    spyOn(localStorage, 'getItem').and.returnValue(of('EXPLORER'));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.orderedTripsTratadas.length).toBe(1);
      expect(component.getOrderedTripsForExplorer).toHaveBeenCalled();
      done();
    });
  }));

});
