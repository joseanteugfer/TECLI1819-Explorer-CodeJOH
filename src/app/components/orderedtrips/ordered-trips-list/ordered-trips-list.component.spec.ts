import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedTripsListComponent } from './ordered-trips-list.component';

describe('OrderedTripsListComponent', () => {
  let component: OrderedTripsListComponent;
  let fixture: ComponentFixture<OrderedTripsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedTripsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedTripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
