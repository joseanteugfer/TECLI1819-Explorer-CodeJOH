import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {

  private ParameterActorId = '_id';
  actor: Actor;

  constructor(private authService: AuthService,
              private apiService: ApiService) { }

  ngOnInit() {
    const id = this.authService.currentActor[this.ParameterActorId];
    this.apiService.getActor(id).subscribe(actor => {
      this.actor = actor;
    });
  }

}
