import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTripPerManagerComponent } from './dashboard-trip-per-manager.component';

describe('DashboardTripPerManagerComponent', () => {
  let component: DashboardTripPerManagerComponent;
  let fixture: ComponentFixture<DashboardTripPerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTripPerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTripPerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
