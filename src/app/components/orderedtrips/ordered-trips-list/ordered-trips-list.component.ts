import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { OrderedTrip } from 'src/app/models/orderedTrip.model';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-ordered-trips-list',
  templateUrl: './ordered-trips-list.component.html',
  styleUrls: ['./ordered-trips-list.component.scss']
})
export class OrderedTripsListComponent extends TranslatableComponent implements OnInit {

  orderedTrips;
  orderedTripsTratadas: OrderedTrip[];
  activeRole: string;
  idCurrentActor: string;
  dtOptions: DataTables.Settings = {};

  constructor(private apiService: ApiService,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.activeRole = localStorage.getItem('activeRole');
    this.idCurrentActor = this.authService.getCurrentActor()._id;
    if (this.activeRole === 'EXPLORER') {
      this.getOrderedTripsForExplorer();
    }
    if (this.activeRole === 'MANAGER') {
      this.apiService.getOrderedTripsFromManager(this.idCurrentActor).subscribe(
        res => {
          if (res !== null) {
            this.orderedTripsTratadas = res;
          }
        }
      );
    }
    if (this.activeRole === 'ADMINISTRATOR') {
      this.getAllOrderedTrips();
    }
  }

  async getOrderedTripsForExplorer() {
    const res = await this.apiService.getOrderedTrip().toPromise();
    this.orderedTrips = res;
    this.orderedTripsTratadas = new Array();
    for (let i = 0; i < this.orderedTrips.length; i++) {
      if (this.orderedTrips[i].actor_id === this.idCurrentActor) {
        this.orderedTripsTratadas.push(this.orderedTrips[i]);
      }
    }
  }

  async getAllOrderedTrips() {
    this.orderedTripsTratadas = await this.apiService.getOrderedTrip().toPromise();
    console.log(this.orderedTripsTratadas[0]);
  }


}
