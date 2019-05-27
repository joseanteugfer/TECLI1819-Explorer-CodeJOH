import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FilterComponent } from '../../shared/filter/filter.component';
import { SubSink } from 'subsink';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent extends TranslatableComponent implements OnInit {
  @ViewChild('filter') filter: FilterComponent;
  tripsAvailables;
  private subs = new SubSink();

  displayedColumns: string[] = ['title', 'description', 'date_start', 'date_end', 'price'];

  constructor(private apiService: ApiService,
              private translateService: TranslateService,
              private router: Router) {
    super(translateService);
  }

  ngOnInit() {
    this.apiService.getTrips().pipe(
      map(trips => trips.filter(trip => {
      if (trip.status === 'PUBLISHED' && this.checkDateStartGreaterNow(trip)) {
        return true;
      } else {
        return false;
      }
      })),
      map(trips => trips.sort(this.compareDates))).subscribe(
      res => {
        this.tripsAvailables = res;
      }
    );
  }

  ngAfterContentInit(): void {
    this.subs.sink = this.filter.searchValueChange.subscribe(searchString => {
      this.getTripsByKeyword(searchString);
    });
  }

  compareDates(trip1, trip2) {
    const date_start1 = Date.parse(trip1.date_start);
    const date_start2 = Date.parse(trip2.date_start);
    if (date_start1 < date_start2) {
      return -1;
    }
    if (date_start1 > date_start2) {
      return 1;
    }
    return 0;
  }

  checkDateStartGreaterNow(trip): boolean {
    const date_start = Date.parse(trip.date_start);
    const date_now = Date.now();
    return (date_start > date_now) ? true : false;
  }

  getTripsByKeyword(keyword: string) {
    this.apiService.getTripsByKeyword(keyword).pipe(
      map(trips => trips.filter(trip => {
      if (trip.status === 'PUBLISHED' && this.checkDateStartGreaterNow(trip)) {
        return true;
      } else {
        return false;
      }
      })),
      map(trips => trips.sort(this.compareDates))).subscribe(res => {
        this.tripsAvailables = res;
    });
  }

  goEdit(id) {
    this.router.navigate(['/trips-details', id]);
  }

}
