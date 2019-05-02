import { Entity } from './entity.model';
import { Actor } from './actor.model';

export class OrderedTrip extends Entity {
    ticker: string;
    status: string;
    date_apply: Date;
    comments: string;
    actor_id: string;
}


