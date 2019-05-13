import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Trip } from 'src/app/models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.scss']
})
export class TripEditComponent extends TranslatableComponent implements OnInit {

  trip: Trip;
  title: string;
  id: string;
  formGroup: FormGroup;

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private apiService: ApiService,
              private datePipe: DatePipe) {
      super(translatableService);
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      date_end: ['', Validators.required],
      date_start: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stages: ['', Validators.required],
      status: ['', Validators.required],
      title: ['', Validators.required]
    });
    this.id = this.route.snapshot.params['id'];

    this.apiService.getTrip(this.id).pipe(
      map(trips => {
        trips[0].date_end = this.datePipe.transform(trips[0].date_end, 'yyyy-MM-dd');
        trips[0].date_start = this.datePipe.transform(trips[0].date_start, 'yyyy-MM-dd');
        return trips[0];
      })
    ).subscribe(trip => {
      this.formGroup.controls['date_end'].setValue(trip.date_end);
      this.formGroup.controls['date_start'].setValue(trip.date_start);
      this.formGroup.controls['description'].setValue(trip.description);
      this.formGroup.controls['price'].setValue(trip.price);
      this.formGroup.controls['stages'].setValue(trip.stages);
      this.formGroup.controls['status'].setValue(trip.status);
      this.formGroup.controls['title'].setValue(trip.title);
    });
  }

  update() {
    // Update Trip propertys
    const trip: Trip = {
      _id: this.id,
      title: this.formGroup.value.title,
      stages: this.formGroup.value.stages,
      description: this.formGroup.value.description,
      date_start: this.formGroup.value.date_start,
      date_end: this.formGroup.value.date_end,
      price: this.formGroup.value.price
    }
    this.apiService.updateTrip(this.id, trip).subscribe(response => {
      console.log(response);
    });

    // Update Trip status
    const status = this.formGroup.value.status;
    this.apiService.updateTripStatus(this.id, status).subscribe(response => {
      console.log(response);
    }, error => {
      console.log('Error: ', error);
    });
  }

}
