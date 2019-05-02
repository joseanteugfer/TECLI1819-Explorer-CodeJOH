import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('TripListComponent', () => {
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
        LocalizedDataPipe
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
      providers: []
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have trips Avaliables', async (done) => {
    expect(component.tripsAvailables).toBeUndefined();
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(apiService, 'getTrips').and.returnValue(of(true));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.tripsAvailables.length).toBeGreaterThan(1);
      done();
    });
  });
});
