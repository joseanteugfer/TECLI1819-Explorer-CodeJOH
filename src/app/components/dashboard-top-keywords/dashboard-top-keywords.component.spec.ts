import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTopKeywordsComponent } from './dashboard-top-keywords.component';

describe('DashboardTopKeywordsComponent', () => {
  let component: DashboardTopKeywordsComponent;
  let fixture: ComponentFixture<DashboardTopKeywordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTopKeywordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTopKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
