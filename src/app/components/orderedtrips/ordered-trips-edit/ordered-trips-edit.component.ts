import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ApiService } from 'src/app/services/api.service';
import { OrderedTrip } from 'src/app/models/orderedTrip.model';

@Component({
  selector: 'app-ordered-trips-edit',
  templateUrl: './ordered-trips-edit.component.html',
  styleUrls: ['./ordered-trips-edit.component.scss']
})
export class OrderedTripsEditComponent extends TranslatableComponent implements OnInit {

  id: string;
  orderedTripGroup: FormGroup;
  orderedTrip: OrderedTrip;
  status = ['PENDING', 'REJECTED'];

  showMessageStatus;
  showMessageError;

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private datePipe: DatePipe) {
                super(translatableService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
  }

  public createForm(): void {
    this.orderedTripGroup = this.formBuilder.group({
      status: ['', Validators.required]
    });
    this.apiService.getOrderedTripById(this.id)
                   .pipe(map(orderedTrips => {
                      orderedTrips[0].date_apply = this.datePipe.transform(orderedTrips[0].date_apply, 'yyyy-MM-dd');
                      return orderedTrips[0];
                    }))
                   .subscribe(orderedTrip => {
                     if (orderedTrip) {
                        this.orderedTrip = orderedTrip;
                        this.orderedTripGroup.controls['status'].setValue(orderedTrip.status);
                     }
    });
  }

  public changeStatus(status: string): void {
    this.apiService.updateOrderedTripStatus(this.id, status).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
