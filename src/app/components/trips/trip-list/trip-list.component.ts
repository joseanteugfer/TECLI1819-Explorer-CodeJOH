import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent extends TranslatableComponent implements OnInit {

  trips;

  displayedColumns: string[] = ['title', 'description', 'date_start', 'date_end', 'price'];

  constructor(private apiService: ApiService,
              private translatableService: TranslateService,
              private router: Router) {
    super(translatableService);
  }

  ngOnInit() {
    this.apiService.getTrips().subscribe(
      res => {
        this.trips = res;
      }
    )
  }

  goEdit(id) {
    this.router.navigate(['/trips-details', id]);
  }

}
