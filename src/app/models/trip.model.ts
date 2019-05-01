import { Entity } from './entity.model';
import { Actor } from './actor.model';
import { Stage } from './stage.model';
import { Sponsorship } from './sponsorship.model';

export interface Trip {
    ticker?: string;
    manager?: Actor;
    title: string;
    description: string;
    price: number;
    requirements?: string[];
    pictures?: string[];
    date_start: Date;
    date_end: Date;
    created?: Date;
    status?: string;
    stages?: Stage[];
    sponsorships?: Sponsorship[];
}