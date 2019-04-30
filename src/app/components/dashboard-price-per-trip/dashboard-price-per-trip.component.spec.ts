import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPricePerTripComponent } from './dashboard-price-per-trip.component';

describe('DashboardPricePerTripComponent', () => {
  let component: DashboardPricePerTripComponent;
  let fixture: ComponentFixture<DashboardPricePerTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPricePerTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPricePerTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
