import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentials = {
        email: 'explorer@gmail.com',
        password: 'explorerexplorer'
    };

    navigateTo() {
        return browser.get('/login');
    }

    checkIsLoginPage() {
        return element(by.css('#btnLogin')).isDisplayed() ? true : false;
    }

    fillCredentials(credentials: any = this.credentials) {
        element(by.css('#email')).sendKeys(credentials.email);
        element(by.css('#pwd')).sendKeys(credentials.password);
        element(by.css('#btnLogin')).click();
    }

    getTextTitle() {
        const selector = 'body > app-root > div > app-login > mat-card > mat-card-header > div > mat-card-title';
        return element(by.css(selector)).getText();
    }
}