import { browser, element, by } from 'protractor';
import { Actor } from 'src/app/models/actor.model';
import { explorer } from '../mocks/explorer';

export class RegisterPage {

    private explorer;

    constructor() {
        this.explorer = explorer;
    }

    navigateTo() {
        return browser.get('/register');
    }

    checkIsRegisterPage(): boolean {
        return element(by.css('#btnRegister')).isDisplayed() ? true : false;
    }

    fillExplorer(actor = this.explorer) {
        element(by.css('#name')).sendKeys(actor.name);
        element(by.css('#surname')).sendKeys(actor.surname);
        element(by.css('#email')).sendKeys(actor.email);
        element(by.css('#password')).sendKeys(actor.password);
        element(by.css('#phone')).sendKeys(actor.phone);
        element(by.css('#btnRegister')).click();
        return actor;
    }

    isRegistered(): boolean {
        return element(by.css('#textCorrect')).isDisplayed() ? true : false;
    }
}