import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { OrderedTrip } from 'src/app/models/orderedTrip.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ordered-trips-list',
  templateUrl: './ordered-trips-list.component.html',
  styleUrls: ['./ordered-trips-list.component.scss']
})
export class OrderedTripsListComponent extends TranslatableComponent implements OnInit {

  orderedTrips;
  orderedTripsTratadas: OrderedTrip[] = new Array();
  activeRole: string;
  idCurrentActor: string;

  constructor(private apiService: ApiService,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.activeRole = localStorage.getItem('activeRole');
    this.idCurrentActor = this.authService.getCurrentActor()._id;
    console.log(this.activeRole);
    if (this.activeRole === 'EXPLORER') {
      console.log('Se llama a getOrderedTripsForExplorer con id de Manager: ',this.idCurrentActor);
      this.getOrderedTripsForExplorer();
    }
    if (this.activeRole === 'MANAGER') {
      console.log('Se llama a getOrderedTripsFromManager con id de Manager: ',this.idCurrentActor);
      this.apiService.getOrderedTripsFromManager(this.idCurrentActor).subscribe(
        res => {
          if (res != null) {
            this.orderedTripsTratadas = res;
          }
        }
      );
    }
  }

  async getOrderedTripsForExplorer() {
    const res = await this.apiService.getOrderedTrip().toPromise();
    this.orderedTrips = res;
    //console.log(this.orderedTrips.toString());
    for (let i = 0; i < this.orderedTrips.length; i++) {
      if (this.orderedTrips[i].actor_id === this.idCurrentActor) {
        this.orderedTripsTratadas.push(this.orderedTrips[i]);
      }
    }
  }


}
