import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTripEditComponent } from './ordered-trip-edit.component';

describe('OrderedTripEditComponent', () => {
  let component: OrderedTripEditComponent;
  let fixture: ComponentFixture<OrderedTripEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTripEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTripEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
