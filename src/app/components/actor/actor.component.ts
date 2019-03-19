import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/Actor.model';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  actors: Array<Actor>;

  constructor() { }

  ngOnInit() {
    this.actors = new Array<Actor>();
    let actor = new Actor();
    actor.name = 'Pepe';
    actor.surname = 'Perez';
    actor.email = 'test@test.com';
    actor.address = 'C/Perez';
    actor.phone = '654987654';
    actor.role = 'Explorer';
    this.actors.push(actor);
  }

}
