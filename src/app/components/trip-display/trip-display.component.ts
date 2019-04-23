import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.scss']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {

  trip = new Trip();
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
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

}
