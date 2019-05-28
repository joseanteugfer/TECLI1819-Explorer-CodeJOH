import { LoginPage } from './login/login.po';
import { browser } from 'protractor';
import { TripsPage } from './trips/trips.po';
import { RegisterPage } from './register/register.po';
import { LocalStorage } from './wrapper/localStorage';

describe('Register App', () => {
    let register: RegisterPage;
    let login: LoginPage;
    let trips: TripsPage;
    let localStorage: LocalStorage;
    let actorRegistered;

    beforeEach(() => {
        register = new RegisterPage();
        login = new LoginPage();
        trips = new TripsPage();
        localStorage = new LocalStorage();
    });

    it('Navigate to Register Page', () => {
        register.navigateTo();
        browser.sleep(2000);
        expect(register.checkIsRegisterPage()).toBeTruthy();
    });

    it('Register Explorer in the system', () => {
        actorRegistered = register.fillExplorer();
        browser.sleep(2000);
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
        expect(role).toEqual('EXPLORER');
    });

});
