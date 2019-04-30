import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrderedTripsByStatusComponent } from './dashboard-ordered-trips-by-status.component';

describe('DashboardOrderedTripsByStatusComponent', () => {
  let component: DashboardOrderedTripsByStatusComponent;
  let fixture: ComponentFixture<DashboardOrderedTripsByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOrderedTripsByStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrderedTripsByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
