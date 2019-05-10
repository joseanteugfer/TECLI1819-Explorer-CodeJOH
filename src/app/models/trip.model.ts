import { Stage } from './stage.model';
import { Sponsorship } from './sponsorship.model';

export interface Trip {
    ticker?: string;
    manager?: string;
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