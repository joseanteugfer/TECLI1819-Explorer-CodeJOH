import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTripComponent } from './ordered-trip.component';

describe('OrderedTripComponent', () => {
  let component: OrderedTripComponent;
  let fixture: ComponentFixture<OrderedTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
