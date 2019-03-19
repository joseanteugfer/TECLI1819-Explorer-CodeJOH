import { Entity } from './Entity.model';

export class Finder extends Entity{
    keyword: String;
    priceRangeMin: number;
    priceRangeMax: number;
    dateRangeStart: Date;
    dateRangeEnd: Date;
}