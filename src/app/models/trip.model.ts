import { Entity } from './entity.model';
import { Actor } from './actor.model';
import { Stage } from './stage.model';
import { Sponsorship } from './sponsorship.model';

export class Trip extends Entity {
    ticker: string;
    manager: Actor;
    title: string;
    description: string;
    price: number;
    requirements: string[];
    pictures: string[];
// tslint:disable-next-line: variable-name
    date_start: Date;
// tslint:disable-next-line: variable-name
    date_end: Date;
    created: Date;
    status: string;
    stages: Stage[];
    sponsorships: Sponsorship[];
}