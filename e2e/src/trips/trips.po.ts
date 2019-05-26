import { browser } from 'protractor';

export class TripsPage {
    navigateTo() {
        return browser.get('/');
    }
}