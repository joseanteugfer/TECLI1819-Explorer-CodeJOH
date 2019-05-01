import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent extends TranslatableComponent implements OnInit {

  trip: Trip;
  title: string;
  id: string;

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private apiService: ApiService) {
    super(translatableService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.apiService.getTrip(this.id).subscribe(response => {
      if (response && response.length > 0) { this.trip = response[0]; }
    }, err => { });
  }

}
