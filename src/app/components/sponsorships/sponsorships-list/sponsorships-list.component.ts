import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-sponsorships-list',
  templateUrl: './sponsorships-list.component.html',
  styleUrls: ['./sponsorships-list.component.scss']
})
export class SponsorshipsListComponent extends TranslatableComponent implements OnInit {

  trips;
  sponsorships: any[];
  tripsFromSponsorships: Trip[];

  constructor(private apiService: ApiService,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {

    this.getTripsBySponsor();

  }

  /* async getSponsorships() {
    const res = await this.apiService.getTrips().toPromise();
    this.trips = res;
    console.log(this.trips.toString());
    if (localStorage.getItem('activeRole') === 'SPONSOR') {
      for (let i = 0; i < this.trips.length; i++) {
        let sponsorshipsByTrip: Sponsorship[];
        if (this.trips[i].sponsorships.length > 0) {
          sponsorshipsByTrip = this.trips[i].sponsorships;
          for (let j = 0; j < sponsorshipsByTrip.length; j++) {
            console.log('CurrentActor id: ' + this.authService.getCurrentActor()._id);
            console.log('Sponsor id: ' + sponsorshipsByTrip[j].actorId);
            if (sponsorshipsByTrip[j].actorId === this.authService.getCurrentActor()._id) {
              this.sponsorships.push(sponsorshipsByTrip[j]);
            }
          }
        }
      }
    } */

  async getSponsorships() {
    this.sponsorships = new Array<Sponsorship>();
    const res = await this.apiService.getTrips().toPromise();
    this.trips = res;
    console.log(this.trips.toString());
    if (localStorage.getItem('activeRole') === 'SPONSOR') {
      for (let i = 0; i < this.trips.length; i++) {
        if (this.trips[i].sponsorships.length > 0) {
          this.trips[i].sponsorships.forEach(sponsor => {
            this.sponsorships.push(sponsor);
          });
        }
      }
    }
    this.sponsorships = Array.from(new Set(this.sponsorships.map(sponsor => sponsor.actorId)));
    console.log(this.sponsorships);
  }

  async getTripsBySponsor() {
    this.tripsFromSponsorships = new Array<Trip>();
    const res = await this.apiService.getTrips().toPromise();
    this.trips = res;
    console.log(this.trips.toString());
    if (localStorage.getItem('activeRole') === 'SPONSOR') {
      for (let i = 0; i < this.trips.length; i++) {
        let sponsorshipsByTrip: Sponsorship[];
        if (this.trips[i].sponsorships.length > 0) {
          sponsorshipsByTrip = this.trips[i].sponsorships;
          for (let j = 0; j < sponsorshipsByTrip.length; j++) {
            if (sponsorshipsByTrip[j].actorId === this.authService.getCurrentActor()._id) {
              this.tripsFromSponsorships.push(this.trips[i]);
            }
          }
        }
      }
    }
    console.log(this.tripsFromSponsorships);
  }

}
