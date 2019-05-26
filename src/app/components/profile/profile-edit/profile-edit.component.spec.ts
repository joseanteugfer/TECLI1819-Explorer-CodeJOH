import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileEditComponent } from './profile-edit.component';
import { ApiService } from 'src/app/services/api.service';
import { DebugElement } from '@angular/core';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

fdescribe('ProfileEditComponent', () => {

    let component: ProfileEditComponent;
    let fixture: ComponentFixture<ProfileEditComponent>;
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
                ProfileEditComponent,
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
        fixture = TestBed.createComponent(ProfileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
    });

    function setForm(actor) {
        component.actorGroup.controls['name'].setValue(actor.name);
        component.actorGroup.controls['surname'].setValue(actor.surname);
        component.actorGroup.controls['email'].setValue(actor.email);
        if (actor.phone) { component.actorGroup.controls['phone'].setValue(actor.phone); }
        if (actor.address) { component.actorGroup.controls['address'].setValue(actor.address); }
    }

    it('form invalid when empty', () => {
        expect(component.actorGroup.valid).toBeFalsy();
    });

    it('name validation required', fakeAsync(() => {
        const actor = {
            name: '',
            surname: 'Rodriguez',
            email: 'pedro@gmail.com',
            phone: '654654654'
        };
        component.createForm();
        setForm(actor);
        const nameController = component.actorGroup.controls['name'];
        expect(nameController.errors['required']).toBeTruthy();
    }));

    it('Name validation error (No numbers)', fakeAsync((done) => {
        const actor = {
            name: 'Pedro23',
            surname: 'Rodriguez',
            email: 'pedro@gmail.com',
            phone: '654654654'
        };
        component.createForm();
        setForm(actor);
        const nameController = component.actorGroup.controls['name'];
        expect(nameController.errors['pattern']).toBeTruthy();
    }));

    it('surname validation required', fakeAsync(() => {
        const actor = {
            name: 'Pedro',
            surname: '',
            email: 'pedro@gmail.com',
            phone: '654654654'
        };
        component.createForm();
        setForm(actor);
        const surnnameController = component.actorGroup.controls['surname'];
        expect(surnnameController.errors['required']).toBeTruthy();
    }));

    it('Email incorrect format (Pattern error validation)', fakeAsync((done) => {
        const actor = {
            name: 'Pedro',
            surname: 'Rodriguez',
            email: 'pedro23',
            phone: '654654654'
        };
        component.createForm();
        setForm(actor);
        const emailController = component.actorGroup.controls['email'];
        expect(emailController.errors['pattern']).toBeTruthy();
    }));

    it('Phone validation error (Min 9 numbers)', fakeAsync((done) => {
        const actor = {
            name: 'Pedro',
            surname: 'Rodriguez',
            email: 'pedro23',
            phone: '6546546'
        };
        component.createForm();
        setForm(actor);
        const phoneController = component.actorGroup.controls['phone'];
        expect(phoneController.errors['minlength']).toBeTruthy();
    }));

    it('Phone validation error (Max 9 numbers)', fakeAsync((done) => {
        const actor = {
            name: 'Pedro',
            surname: 'Rodriguez',
            email: 'pedro23',
            phone: '65465462321312321'
        };
        component.createForm();
        setForm(actor);
        const phoneController = component.actorGroup.controls['phone'];
        expect(phoneController.errors['maxlength']).toBeTruthy();
    }));

    it('Phone validation error (Only numbers)', fakeAsync((done) => {
        const actor = {
            name: 'Pedro',
            surname: 'Rodriguez',
            email: 'pedro23',
            phone: '65465erds'
        };
        component.createForm();
        setForm(actor);
        const phoneController = component.actorGroup.controls['phone'];
        expect(phoneController.errors['pattern']).toBeTruthy();
    }));

    it('Form valid without validations errors', fakeAsync((done) => {
        const actor = {
            name: 'Pedro',
            surname: 'Rodriguez',
            email: 'pedro@gmail.com',
            phone: '654654654',
            address: ''
        };
        component.createForm();
        setForm(actor);
        expect(component.actorGroup.value).toEqual(actor);
        expect(component.actorGroup.valid).toBeTruthy();
    }));

});
