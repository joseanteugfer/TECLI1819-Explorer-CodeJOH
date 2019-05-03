import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { BehaviorSubject } from 'rxjs';

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
  /*apply: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isApplicationDone());*/


  constructor(private translatableService: TranslateService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService) {
    super(translatableService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isExplorer = (localStorage.getItem("activeRole") === 'EXPLORER');
    this.applicationDone = false;
    //this.apply.subscribe();

    this.apiService.getTrip(this.id).subscribe(response => {
      if (response && response.length > 0) { this.trip = response[0]; }
    }, err => { });
  }

  applyTrip() {

    if ((this.currentActor = this.authService.getCurrentActor()) !== undefined && this.isExplorer) {
      this.applicationDone = false;
      let orderedTrip: string = JSON.stringify({
        ticker: this.trip.ticker,
        status: "PENDING",
        date_apply: Date.now(),
        comments: "",
        actor_id: this.currentActor._id
      });
      this.apiService.createOrderedTrip(orderedTrip).subscribe(response => {
        if (response) {
          this.applicationDone = true;
          console.log(response)
        }
      }, err => { });
    }
  }

  /*isApplicationDone(): boolean {
    return this.applicationDone;
  }*/

}
