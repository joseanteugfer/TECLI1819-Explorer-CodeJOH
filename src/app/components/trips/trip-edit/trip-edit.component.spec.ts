import { TripEditComponent } from "./trip-edit.component";
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule, FormsModule, FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

fdescribe('TripEditComponent', () => {

    let component: TripEditComponent;
    let fixture: ComponentFixture<TripEditComponent>;
    let translate: TranslateService;
    let apiService: ApiService;
    let formBuilder: FormBuilder;
    let debugElement: DebugElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterTestingModule,
                ReactiveFormsModule,
                FormsModule,
                CoreModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                }}),
                SharedModule,
                MDBBootstrapModule.forRoot()
                ],
            declarations: [
                TripEditComponent,
                TranslatableComponent
            ],
            providers: [
                ApiService,
                DatePipe,
                FormBuilder
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        translate = TestBed.get(TranslateService);
        apiService = TestBed.get(ApiService);
        formBuilder = TestBed.get(FormBuilder);
        fixture = TestBed.createComponent(TripEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
    })

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    function setForm(trip) {
        component.tripGroup.controls['title'].setValue(trip.title);
        component.tripGroup.controls['date_start'].setValue(trip.date_start);
        component.tripGroup.controls['date_end'].setValue(trip.date_end);
        component.tripGroup.controls['description'].setValue(trip.description);
        component.tripGroup.controls['price'].setValue(trip.price);
        component.tripGroup.controls['status'].setValue(trip.status);
        if (trip.stages) {
            const stages = component.tripGroup.get('stages') as FormArray;
            trip.stages.forEach((stage) => {
                stages.push(createItemStage(stage.title, stage.description, stage.price));
            });
        }
    }

    function createItemStage(title: string = '', description: string = '', price = ''): FormGroup {
        return formBuilder.group({
          title: [title, Validators.required],
          description: description,
          price: [price, Validators.required]
        });
      }

    // Testing validation
    it('form invalid when empty', () => {
        expect(component.tripGroup.valid).toBeFalsy();
    });
    // Form testing
    it('form valid without validations errors', fakeAsync((done) => {
        const trip = {
            title: 'Barcelona',
            date_start: '2019-08-11',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        };
        component.createForm();
        setForm(trip);
        expect(component.tripGroup.valid).toBeTruthy();
    }));

    it('field price updated with sum of prices stages', fakeAsync((done) => {
        const price1 = 800;
        const price2 = 200;
        const trip = [{
            title: 'Vigo',
            date_start: '2019-07-11',
            date_end: '2019-08-13',
            description: 'New trip to Vigo',
            price: '',
            status: 'PUBLISHED',
            stages: [{
                title: 'Islas Cíes',
                price: price1
            },
            {
               title: 'Baiona',
               price: price2 
            }]
        }];
        const spy = spyOn(apiService, 'getTrip').and.returnValue(of(trip));
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const priceControl = component.tripGroup.controls['price'];
            expect(priceControl.value).toEqual(price1 + price2);
            expect(apiService.getTrip).toHaveBeenCalled();
            done();
        });
    }));

    it('field date_start invalid when value is less than now', fakeAsync((done) => {
        const trip = [{
            title: 'Barcelona',
            date_start: '2019-02-11',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        }];
        const spy = spyOn(apiService, 'getTrip').and.returnValue(of(trip));
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dateStartControl = component.tripGroup.controls['date_start'];
            expect(dateStartControl.errors['dateLess']).toBeTruthy();
            expect(apiService.getTrip).toHaveBeenCalled();
            done();
        });
    }));

    it('field date_end invalid when value is less than now', fakeAsync((done) => {
        const trip = [{
            title: 'Barcelona',
            date_start: '2019-02-11',
            date_end: '2019-02-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        }];
        const spy = spyOn(apiService, 'getTrip').and.returnValue(of(trip));
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dateEndControl = component.tripGroup.controls['date_end'];
            expect(dateEndControl.errors['dateLess']).toBeTruthy();
            expect(apiService.getTrip).toHaveBeenCalled();
            done();
        });
    }));

    it('field date_start and date_end invalid when date_end is greater than date_start', fakeAsync((done) => {
        const trip = [{
            title: 'Barcelona',
            date_start: '2019-08-21',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        }];
        const spy = spyOn(apiService, 'getTrip').and.returnValue(of(trip));
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.tripGroup.errors['dateEndLessStart']).toBeTruthy();
            expect(apiService.getTrip).toHaveBeenCalled();
            done();
        });
    }));

    it('title validation required', fakeAsync(() => {
        const trip = {
            title: '',
            date_start: '2019-08-11',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        };
        component.createForm();
        setForm(trip);
        const titleControler = component.tripGroup.controls['title'];
        expect(titleControler.errors['required']).toBeTruthy();
    }));

    it('Display correct message when submit valid Trip', fakeAsync((done) => {
        const trip = {
            title: 'Barcelona',
            date_start: '2019-08-11',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        };
        component.createForm();
        setForm(trip);
        expect(component.tripGroup.valid).toBeTruthy();
        component.id = '23325324';
        const spy = spyOn(apiService, 'updateTrip').and.returnValue(of(trip));
        component.onSubmit();
        fixture.detectChanges();
        expect(component.showMessageUpdated).toBeTruthy();
        tick(3000);
        expect(component.showMessageUpdated).toBeFalsy();
        fixture.whenStable().then(() => {
            expect(apiService.updateTrip).toHaveBeenCalled();
            done();
        });
    }));

    it('Display incorrect message when response with code 404', fakeAsync((done) => {
        const trip = {
            title: 'Barcelona',
            date_start: '2019-08-11',
            date_end: '2019-08-13',
            description: 'New trip to Barcelona',
            price: '2300',
            status: 'PUBLISHED',
            stages: []
        };
        component.createForm();
        setForm(trip);
        expect(component.tripGroup.valid).toBeTruthy();
        component.id = '23325324';
        const error = {
            message: 'Not Found',
            status: 404
        }
        const spy = spyOn(apiService, 'updateTrip').and.returnValue(throwError(error));
        component.onSubmit();
        fixture.detectChanges();
        expect(component.showMessageError).toBeTruthy();
        tick(3000);
        expect(component.showMessageError).toBeFalsy();
        fixture.whenStable().then(() => {
            expect(apiService.updateTrip).toHaveBeenCalled();
            done();
        });
    }));

});
