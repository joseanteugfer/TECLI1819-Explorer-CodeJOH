import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Actor } from 'src/app/models/actor.model';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent extends TranslatableComponent implements OnInit {

  private ParameterActorId = '_id';
  actor: Actor;
  actorGroup: FormGroup;

  constructor(private authService: AuthService,
              private apiService: ApiService,
              private translateService: TranslateService) {
                super(translateService);
               }

  ngOnInit() {
    const id = this.authService.currentActor[this.ParameterActorId];
    this.apiService.getActor(id).subscribe(actor => {
      console.log(actor);
      this.actor = actor;
    });
  }

}
