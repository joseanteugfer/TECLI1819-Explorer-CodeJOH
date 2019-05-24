import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-list-all',
  templateUrl: './trip-list-all.component.html',
  styleUrls: ['./trip-list-all.component.scss']
})
export class TripListAllComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];
  dtOptions: DataTables.Settings = {};

  constructor(private apiService: ApiService,
              private translateService: TranslateService,
              private router: Router) {
      super(translateService);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.apiService.getTrips().pipe(map(trips => trips as Trip[])).subscribe(
      res => {
        this.trips = res;
      });
  }

  goEdit(id) {
    this.router.navigate(['/trips-details', id]);
  }
}
