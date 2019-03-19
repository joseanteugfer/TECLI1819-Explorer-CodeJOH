import { Entity } from './Entity.model';
import { Finder } from './Finder.model';

export class Actor extends Entity{
    name: String;
    surname: String;
    email: String;
    password: String;
    preferredLanguage: String;
    phone: String;
    address: String;
    role: String;
    validated: Boolean;
    banned: Boolean;
    customToken: String;
    created: Date;
    finder: Finder;
}