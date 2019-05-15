import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent extends TranslatableComponent implements OnInit {

  trip: Trip;
  title: string;
  id: string;
  isExplorer: boolean;
  currentActor: Actor;
  applicationDone: boolean;

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService) {
              super(translatableService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isExplorer = (localStorage.getItem('activeRole') === 'EXPLORER');
    this.applicationDone = false;
    this.apiService.getTrip(this.id)
                   .pipe(map(trip => trip[0] as Trip))
                   .subscribe((trip: Trip) => this.trip = trip);
  }

  applyTrip(trip) {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor && this.isExplorer) {
      this.applicationDone = false;
      const orderedTrip: string = JSON.stringify({
        ticker: trip.ticker,
        status: 'PENDING',
        date_apply: Date.now(),
        comments: '',
        actor_id: this.currentActor._id
      });
      this.apiService.createOrderedTrip(orderedTrip).subscribe(response => {
        if (response) {
          this.applicationDone = true;
        }
      }, err => { });
    }
  }

}
