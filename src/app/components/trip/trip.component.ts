import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent extends TranslatableComponent implements OnInit {

  trips;

  displayedColumns: string[] = ['title', 'description', 'date_start', 'date_end', 'price'];

  constructor(private apiService: ApiService,
              private translatableService: TranslateService) {
    super(translatableService);
  }

  ngOnInit() {
    this.apiService.getTrips().subscribe(
      res => {
        this.trips = res;
        console.log(this.trips);
      }
    )
  }

}
