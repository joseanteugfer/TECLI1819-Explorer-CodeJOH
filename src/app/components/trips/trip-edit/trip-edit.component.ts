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
  tripGroup: FormGroup;
  showMessageStatus = false;
  showMessageUpdated = false;
  showMessageError = false;
  status = ['PUBLISHED', 'ENDED', 'STARTED', 'CREATED', 'CANCELLED'];
  codeError: number;
  flagError: number;
  timeDisplayMessage = 3000; //ms

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
    this.tripGroup = this.formBuilder.group({
      title: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.apiService.getTrip(this.id)
                   .pipe(map(trips => {
                      trips[0].date_end = this.datePipe.transform(trips[0].date_end, 'yyyy-MM-dd');
                      trips[0].date_start = this.datePipe.transform(trips[0].date_start, 'yyyy-MM-dd');
                      return trips[0];
                    }))
                   .subscribe(trip => {
                     if (trip) {
                        this.trip = trip;
                        this.tripGroup.controls['title'].setValue(trip.title);
                        this.tripGroup.controls['date_end'].setValue(trip.date_end);
                        this.tripGroup.controls['date_start'].setValue(trip.date_start);
                        this.tripGroup.controls['description'].setValue(trip.description);
                        this.tripGroup.controls['price'].setValue(trip.price);
                        this.tripGroup.controls['status'].setValue(trip.status);
                        // this.tripGroup.controls['stages'].setValue(trip.stages);
                     }
    });
  }

  public displayMessage(error: boolean, params?: object): void {
    if (!error) {
      const checkUpdate = params['check'] ? params['check'] : 'trip';
      if (checkUpdate === 'trip') {
        this.showMessageUpdated = true;
      }  else {
        this.showMessageStatus = true;
      }
      setTimeout(() => {
        this.showMessageStatus = false;
        this.showMessageUpdated = false;
      }, this.timeDisplayMessage);
    } else {
      this.showMessageError = true;
      this.codeError = params['code'] ? params['code'] : 500;
      if (this.codeError === 405) {
        this.flagError = params['flag'] ? params['flag'] : 1;
      }
      setTimeout(() => {
        this.showMessageError = false;
      }, this.timeDisplayMessage);
    }
  }

  public changeStatus(stat): void {
    if (stat !== this.trip.status) {
      this.apiService.updateTripStatus(this.id, stat).pipe(map(trip => trip as Trip)).subscribe(response => {
        this.trip = response;
        this.displayMessage(false, {check: 'status'});
      }, error => {
        const errorParams = { };
        errorParams['code'] = error.status;
        if (errorParams['code'] === 405) {
          if (error.error.flag) {
            errorParams['flag'] = error.error.flag;
          }
        }
        this.displayMessage(true, errorParams);
      });
    }
  }

  public onSubmit(): void {
    const formModel = this.tripGroup.value;
    const formModelFiltered: Trip = Object.keys(formModel)
                                    .filter(key => key !== 'status')
                                    .reduce((obj, key) => {
                                      obj[key] = formModel[key];
                                      return obj;
                                    }, {} as Trip);
    this.apiService.updateTrip(this.id, formModelFiltered).pipe(map(trip => trip as Trip)).subscribe(response => {
      this.trip = response;
      this.displayMessage(false, {check: 'trip'});
    }, error => {
      const errorParams = { };
      errorParams['code'] = error.status;
      if (errorParams['code'] === 405) {
        if (error.error.flag) {
          errorParams['flag'] = error.error.flag;
        }
      }
      this.displayMessage(true, errorParams);
    });
  }

}
