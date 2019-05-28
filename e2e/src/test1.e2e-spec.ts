import { LoginPage } from "./login/login.po";
import { browser } from 'protractor';
import { TripsPage } from './trips/trips.po';

describe('Login in App', () => {
    let login: LoginPage;
    let trips: TripsPage;

    beforeEach(() => {
        login = new LoginPage();
        trips = new TripsPage();
    });

    it('Login succesfully', () => {
        login.navigateTo();
        browser.sleep(2000);
        expect(login.checkIsLoginPage()).toBeTruthy();
        login.fillCredentials();
        browser.sleep(4000);
        expect(trips.checkIsTripsPage()).toBeTruthy();
    });
});