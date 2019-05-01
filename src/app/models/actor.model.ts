
import { Entity } from './entity.model';
import { Finder } from './finder.model';

export class Actor extends Entity {
    _id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    preferredLanguage: string;
    phone: string;
    address: string;
    role: string;
    validated: boolean;
    banned: boolean;
    customToken: string;
    created: Date;
    finder: Finder;
}
