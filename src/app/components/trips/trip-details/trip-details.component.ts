import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Trip } from 'src/app/models/trip.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';


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
  activeRole: string;
  applicationDone: boolean;
  canEditDelete = false;
  codeError: number;
  showMessageError = false;
  showMessageCorrect = false;

  constructor(private translatableService: TranslateService,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService) {
              super(translatableService);
  }

  ngOnInit() {
    this.activeRole = localStorage.getItem('activeRole');
    if (this.activeRole === 'ADMINISTRATOR') {
      this.canEditDelete = true;
    }
    this.currentActor = this.authService.getCurrentActor();
    this.id = this.route.snapshot.params['id'];
    this.isExplorer = (localStorage.getItem('activeRole') === 'EXPLORER');
    this.applicationDone = false;
    this.apiService.getTrip(this.id)
                   .pipe(map(trip => trip[0] as Trip))
                   .subscribe((trip: Trip) => {
                     this.trip = trip;
                     if (trip.manager === this.currentActor._id) {
                       this.canEditDelete = true;
                     }
                    });
  }

  applyTrip(trip) {
    if (this.currentActor && this.isExplorer) {
      this.applicationDone = false;
      const orderedTrip: string = JSON.stringify({
        ticker: trip.ticker,
        status: 'PENDING',
        //status: 'DUE',
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

  deleteTrip(trip: Trip) {
    this.apiService.deleteTrip(trip._id).subscribe(_ => {
      this.displayMessage(false);
    }, error => {
      const errorParams = { };
      errorParams['code'] = error.status;
      this.displayMessage(true, errorParams);
    });
  }

  public displayMessage(error: boolean, params?: object): void {
    if (!error) {
      this.showMessageCorrect = true;
    } else {
      this.showMessageError = true;
      this.codeError = params['code'] ? params['code'] : 500;
    }
  }

}
