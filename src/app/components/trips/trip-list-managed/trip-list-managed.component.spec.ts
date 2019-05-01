import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListManagedComponent } from './trip-list-managed.component';

describe('TripListManagedComponent', () => {
  let component: TripListManagedComponent;
  let fixture: ComponentFixture<TripListManagedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListManagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListManagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
