import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderedTripsPerTripComponent } from './dashboard-ordered-trips-per-trip.component';

describe('DashboardOrderedTripsPerTripComponent', () => {
  let component: DashboardOrderedTripsPerTripComponent;
  let fixture: ComponentFixture<DashboardOrderedTripsPerTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOrderedTripsPerTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderedTripsPerTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
