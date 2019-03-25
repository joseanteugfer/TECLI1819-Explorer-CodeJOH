import { Entity } from './entity.model';
import { Actor } from './actor.model';

export class Sponsorship extends Entity {
    link: string;
    banner: string;
    actorId: Actor;
    payed: boolean;
}
