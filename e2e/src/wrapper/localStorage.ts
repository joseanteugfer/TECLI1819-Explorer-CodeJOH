import { browser } from 'protractor';

export class LocalStorage {

    getItem(key: string) {
        const script = `return window.localStorage.getItem('${key}');`;
        return browser.executeScript(script);
    }

}
