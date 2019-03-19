import { Entity } from './Entity.model';
import { Actor } from './Actor.model';

export class Trip extends Entity {
    ticker: String;
    manager: Actor;
    title: String;
    description: String;
    price: number;
    requirements: String[];
    pictures: String[];
    date_start: Date;
    date_end: Date;
    created: Date;
    status: String;
}