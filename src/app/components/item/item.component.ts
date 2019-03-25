import { Component, OnInit } from '@angular/core';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

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
