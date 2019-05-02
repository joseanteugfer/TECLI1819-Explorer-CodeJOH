import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Sponsorship } from 'src/app/models/sponsorship.model';

@Component({
  selector: 'app-sponsorships-list',
  templateUrl: './sponsorships-list.component.html',
  styleUrls: ['./sponsorships-list.component.scss']
})
export class SponsorshipsListComponent extends TranslatableComponent implements OnInit {

  trips;
  sponsorships: Sponsorship[] = new Array();

  constructor(private apiService: ApiService,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {

    this.getSponsorshipsBySponsor();

  }

  async getSponsorshipsBySponsor() {
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
    }
  }

}
