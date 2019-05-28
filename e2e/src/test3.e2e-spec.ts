import { LoginPage } from './login/login.po';
import { browser, element, by } from 'protractor';
import { TripsPage } from './trips/trips.po';
import { RegisterPage } from './register/register.po';
import { LocalStorage } from './wrapper/localStorage';
import { explorer } from './mocks/explorer';
import { TripsDetailsPage } from './trips/trips-details.po';

describe('Trip application', () => {
    let register: RegisterPage;
    let login: LoginPage;
    let trips: TripsPage;
    let localStorage: LocalStorage;
    let actorRegistered;
    let tripsDetails: TripsDetailsPage;

    beforeEach(() => {
        register = new RegisterPage();
        login = new LoginPage();
        trips = new TripsPage();
        localStorage = new LocalStorage();
        actorRegistered = explorer;
        tripsDetails = new TripsDetailsPage();
    });

    it('Navigate to Login Page', () => {
        login.navigateTo();
        browser.sleep(2000);
        expect(login.checkIsLoginPage()).toBeTruthy();
    });

    it('Login with Explorer user', () => {
        login.fillCredentials(actorRegistered);
        browser.sleep(4000);
        expect(trips.checkIsTripsPage()).toBeTruthy();
    });

    it('Check current user have explorer role', () => {
        const role = localStorage.getItem('activeRole');
        browser.sleep(2000);
        expect(role).toEqual('EXPLORER');
    });

    it('Go to Details of first trip', () => {
        const selector = 'body > app-root > div > app-trip > div.card-deck.card-customer_container > div:nth-child(1) > a';
        tripsDetails.detailsFromFirstTrip();
        browser.sleep(2000);
        expect(tripsDetails.checkIsTripsDetailsPage).toBeTruthy();
    });

    it('Check trip is PUBLISHED & not started', () => {
        const status = tripsDetails.getStatusTrip();
        expect(status).toEqual('PUBLISHED');
        expect(tripsDetails.checkTipNotStarted).toBeTruthy();
    });

    it('Apply trip', () => {
        tripsDetails.applyTrip();
        browser.sleep(4000);
        const elementMessage = element(by.css('#messageApply'));
        expect(elementMessage.isPresent()).toBeTruthy();
    });

});