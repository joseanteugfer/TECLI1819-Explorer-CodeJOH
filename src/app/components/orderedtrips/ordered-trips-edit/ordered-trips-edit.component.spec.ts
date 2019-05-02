import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTripsEditComponent } from './ordered-trips-edit.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {}
  get testParams(){ return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  get snapshot() {
    return { paras: this.testParams };
  }
}


describe('OrderedTripsEditComponent', () => {
  let component: OrderedTripsEditComponent;
  let fixture: ComponentFixture<OrderedTripsEditComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ OrderedTripsEditComponent ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // mockActivatedRoute.testParams = {_id: '5cc8b4abbb885808277a0152'};
    fixture = TestBed.createComponent(OrderedTripsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
