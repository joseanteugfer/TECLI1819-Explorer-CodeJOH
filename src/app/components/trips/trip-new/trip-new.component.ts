import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { Trip } from 'src/app/models/trip.model';
import { ApiService } from 'src/app/services/api.service';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { dateLessThanNow, dateEndLessStart } from 'src/app/services/custom-validator.service';

@Component({
  selector: 'app-trip-new',
  templateUrl: './trip-new.component.html',
  styleUrls: ['./trip-new.component.scss']
})
export class TripNewComponent extends TranslatableComponent implements OnInit {

  tripNewGroup: FormGroup;
  stages: FormArray;
  codeError: number;
  flagError: number;
  showMessageCorrect = false;
  showMessageError = false;
  timeDisplayMessage = 3000; //ms
  currentActor: Actor;

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private apiService: ApiService,
              private datePipe: DatePipe) {
    super(translatableService);
  }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    this.createForm();
  }

  public createForm(): void {
    this.tripNewGroup = this.formBuilder.group({
      title: ['', Validators.required],
      date_start: ['', [Validators.required,  dateLessThanNow()] ],
      date_end: ['', [Validators.required,  dateLessThanNow()]],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stages: this.formBuilder.array([ this.createItemStage() ])
    }, { validator: dateEndLessStart });
    this.tripNewGroup.get('stages').valueChanges.subscribe((stages) => {
      const total = this.updateTotalPrice(stages);
      if (total === 0) {
        this.tripNewGroup.get('price').enable();
      } else {
        this.tripNewGroup.get('price').disable();
      }
    });
  }

  public updateTotalPrice(stages): number {
    let total = 0;
    stages.forEach((stage) => {
      const price = stage['price'] ? parseInt(stage['price']) : 0;
      total += price;
    });
    this.tripNewGroup.get('price').setValue(total);
    return total;
  }

  public createItemStage(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
      description: '',
      price: ['', Validators.required]
    });
  }

  public addStage(): void {
    this.stages = this.tripNewGroup.get('stages') as FormArray;
    this.stages.push(this.createItemStage());
  }

  public deleteStage(index: number): void {
    this.stages = this.tripNewGroup.get('stages') as FormArray;
    this.updateTotalPrice(this.stages.value);
    this.stages.removeAt(index);
  }

  public displayMessage(error: boolean, params?: object): void {
    if (!error) {
      this.showMessageCorrect = true;
      setTimeout(() => {
        this.showMessageCorrect = false;
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

  public onSubmit(): void {
    const trip: Trip = this.tripNewGroup.value;
    trip['manager'] = this.currentActor._id;
    this.apiService.postTrip(trip).subscribe(response => {
      this.displayMessage(false);
    }, error => {
      const errorParams = { };
      errorParams['code'] = error.status;
      this.displayMessage(true, errorParams);
    });
  }

}
