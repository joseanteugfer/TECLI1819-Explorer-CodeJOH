import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTripsEditComponent } from './ordered-trips-edit.component';

describe('OrderedTripsEditComponent', () => {
  let component: OrderedTripsEditComponent;
  let fixture: ComponentFixture<OrderedTripsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTripsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTripsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
