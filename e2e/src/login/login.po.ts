import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentials = {
        username: 'explorer@gmail.com',
        password: 'explorerexplorer'
    };

    navigateTo() {
        return browser.get('/login');
    }

    fillCredentials(credentials: any = this.credentials) {
        element(by.css('#email')).sendKeys(credentials.username);
        element(by.css('#pwd')).sendKeys(credentials.password));
        element(by.css('#btnLogin')).click();
    }
}