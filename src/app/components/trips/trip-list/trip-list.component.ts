import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  tripsAvailables;

  displayedColumns: string[] = ['title', 'description', 'date_start', 'date_end', 'price'];

  constructor(private apiService: ApiService,
              private translateService: TranslateService,
              private router: Router) {
    super(translateService);
  }

  ngOnInit() {
    this.apiService.getTrips().pipe(map(trips => trips.filter(trip => trip.status === 'PUBLISHED'))).subscribe(
      res => {
        this.tripsAvailables = res;
      }
    )
  }

  goEdit(id) {
    this.router.navigate(['/trips-details', id]);
  }

}
