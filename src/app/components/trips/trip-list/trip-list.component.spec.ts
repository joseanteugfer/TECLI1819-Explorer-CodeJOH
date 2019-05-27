import { async, ComponentFixture, TestBed, getTestBed, fakeAsync } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Injector } from '@angular/core';
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
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterManagerComponent } from '../../security/register-manager/register-manager.component';
import { FilterComponent } from '../../shared/filter/filter.component';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

fdescribe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;
  let injector: Injector;
  let translate: TranslateService;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TripListComponent,
        LoginComponent,
        RegisterComponent,
        FooterComponent,
        HeaderComponent,
        DashboardComponent,
        TermsAndConditionsComponent,
        NotFoundComponent,
        DeniedAccessPageComponent,
        LocalizedDataPipe,
        RegisterManagerComponent,
        FilterComponent
      ],
      imports: [
        HttpClientModule,
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
      providers: [ApiService, TranslateService, DatePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    translate = injector.get(TranslateService);
    apiService = TestBed.get(ApiService);
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.tripsAvailables = [];
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have trips in start', () => {
    expect(component.tripsAvailables).toBeUndefined();
  });

  it('should have the correct number of trips', fakeAsync ((done) => {
    expect(component.tripsAvailables).toBeUndefined();

    const trips = [{
      status: 'PUBLISHED',
      _id: '5ca23b51f328122c42ebf5b3',
      ticker: '190301-ACSS',
      title: 'Pamplona',
      manager: '5ca23b51f328122c42ebf58b',
      description: 'Pamplona trip',
      date_start: '2019-03-01T00:00:00.000Z',
      date_end: '2019-03-15T00:00:00.000Z',
      price: 946
    }];

    spyOn(apiService, 'getTrips').and.returnValue(of(trips));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.tripsAvailables.length).toBeGreaterThan(0);
      expect(apiService.getTrips).toHaveBeenCalled();
      done();
    });
  }));
});
