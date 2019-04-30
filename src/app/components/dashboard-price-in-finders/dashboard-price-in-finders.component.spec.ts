import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPriceInFindersComponent } from './dashboard-price-in-finders.component';

describe('DashboardPriceInFindersComponent', () => {
  let component: DashboardPriceInFindersComponent;
  let fixture: ComponentFixture<DashboardPriceInFindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPriceInFindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPriceInFindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
