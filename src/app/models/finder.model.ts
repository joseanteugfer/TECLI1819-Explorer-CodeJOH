import { Entity } from './entity.model';

export class Finder extends Entity{
    keyword: string;
    priceRangeMin: number;
    priceRangeMax: number;
    dateRangeStart: Date;
    dateRangeEnd: Date;
}
