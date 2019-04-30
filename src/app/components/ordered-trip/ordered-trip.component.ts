import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ordered-trip',
  templateUrl: './ordered-trip.component.html',
  styleUrls: ['./ordered-trip.component.scss']
})
export class OrderedTripComponent extends TranslatableComponent implements OnInit {

  orderedTrips;

  constructor(private apiService: ApiService,
              private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.apiService.getOrderedTrip().subscribe(
      res => {
        if (res != null) {
          this.orderedTrips = res;
          console.log(this.orderedTrips);
        }
      }
    );
  }


}
