import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { ApiService } from 'src/app/services/api.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent extends TranslatableComponent implements OnInit {

  actorGroup: FormGroup;
  id: string;
  actor: Actor;
  showMessageUpdated = false;
  showMessageError = false;
  codeError: number;
  flagError: number;
  timeDisplayMessage = 3000; //ms

  constructor(private translatableService: TranslateService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private apiService: ApiService) {
      super(translatableService);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.createForm();
  }

  public createForm(): void {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const onlyStringRegex = '^^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$';
    const onlyNumberRegex = '^[0-9]*$';
    this.actorGroup = this.formBuilder.group({
      name: ['', Validators.compose([
                Validators.required,
                Validators.pattern(onlyStringRegex)] )],
      surname: ['', Validators.compose([
                    Validators.required,
                    Validators.pattern(onlyStringRegex)] )],
      email: ['', Validators.compose([
              Validators.required,
              Validators.pattern(emailRegex)])],
      phone: ['', Validators.compose([
                  Validators.minLength(9),
                  Validators.maxLength(9),
                  Validators.pattern(onlyNumberRegex)
      ])],
      address: ''
    });
    this.apiService.getActor(this.id).subscribe(actor => {
      if (actor) {
        this.actor = actor;
        this.actorGroup.controls['name'].setValue(actor.name);
        this.actorGroup.controls['surname'].setValue(actor.surname);
        this.actorGroup.controls['email'].setValue(actor.email);
        if (actor.phone) { this.actorGroup.controls['phone'].setValue(actor.phone); }
        if (actor.address) { this.actorGroup.controls['address'].setValue(actor.address); }
      }
    });
  }

  public displayMessage(error: boolean, params?: object): void {
    if (!error) {
      this.showMessageUpdated = true;
      setTimeout(() => {
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

  public onSubmit(): void {
    const formModel = this.actorGroup.value;
    this.apiService.updateActor(this.id, formModel).subscribe(response => {
      this.actor = response;
      this.displayMessage(false);
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
