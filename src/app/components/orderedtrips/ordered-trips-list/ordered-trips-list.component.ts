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
    console.log(this.orderedTripsTratadas);
  }

  async getAllOrderedTrips() {
    this.orderedTripsTratadas = await this.apiService.getOrderedTrip().toPromise();
    console.log(this.orderedTripsTratadas[0]);
  }

  public rejectOrderedTrip(id: string): void {
    const status = 'REJECTED';
    this.callToUpdateStatus(id, status);
  }

  /* public pendingOrderedTrip(id: string) {
    const status = 'PENDING';
    this.callToUpdateStatus(id, status);
  } */

  public dueOrderedTrip(id: string) {
    const status = 'DUE';
    this.callToUpdateStatus(id, status);
  }

  public callToUpdateStatus(id: string, status: string) {
    this.apiService.updateOrderedTripStatus(id, status).subscribe(orderedTrip => {
      const index = this.orderedTripsTratadas.findIndex(obj => obj._id === orderedTrip._id );
      this.orderedTripsTratadas[index] = orderedTrip;
    }, error => {
      console.log(error);
    });
  }

  public payOrderedTrip(id: string): void {
    this.apiService.payOrderedTrip(id).subscribe(orderedTrip => {
      const index = this.orderedTripsTratadas.findIndex(obj => obj._id === orderedTrip._id );
      this.orderedTripsTratadas[index] = orderedTrip;
    }, error => {
      console.log(error);
    });
  }

  public cancelOrderedTrip(id: string): void {
    this.apiService.cancelOrderedTrip(id).subscribe(orderedTrip => {
      const index = this.orderedTripsTratadas.findIndex(obj => obj._id === orderedTrip._id );
      this.orderedTripsTratadas[index] = orderedTrip;
    }, error => {
      console.log(error);
    })
  }

  public getOrderedTripStyle(status: string) {
    const style = {};
    if (status === 'PENDING' || status === 'CANCELLED') {
      style['background-color'] = 'white';
      style['color'] = 'black';
    }
    if (status === 'REJECTED') {
      style['background-color'] = '#C2C2C1';
      style['color'] = 'white';
    }
    if (status === 'DUE') {
      style['background-color'] = '#E6E678';
      style['color'] = 'black';
    }
    if (status === 'ACCEPTED') {
      style['background-color'] = '#7CE36D';
      style['color'] = 'white';
    }
    return style;
  }

}
