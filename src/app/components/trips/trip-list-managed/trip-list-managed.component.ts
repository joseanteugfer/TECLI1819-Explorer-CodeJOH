import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TripsModule } from '../trips.module';
import { Trip } from '../../../models/trip.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trip-list-managed',
  templateUrl: './trip-list-managed.component.html',
  styleUrls: ['./trip-list-managed.component.scss']
})
export class TripListManagedComponent extends TranslatableComponent implements OnInit {

  trips: Trip[];
  tripsManaged: Trip[] = new Array();

  displayedColumns: string[] = ['title', 'description', 'date_start', 'date_end', 'price'];

  constructor(private apiService: ApiService,
              private translatableService: TranslateService,
              private router: Router,
              private authService: AuthService) {
    super(translatableService);
  }

  ngOnInit() {

    this.apiService.getTripsFromManager(this.authService.getCurrentActor()._id).subscribe(
      res => {
        this.tripsManaged = res;
      }
    )

  }

  goEdit(id) {
    this.router.navigate(['/trips-details', id]);
  }
}
