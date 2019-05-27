import { browser, by, element } from 'protractor';

export class TripsPage {
    navigateTo() {
        return browser.get('/');
    }

    checkIsTripsPage() {
        return element(by.css('.container-filter')).isPresent() ? true : false;
    }

    getFilterLabelText() {
        const selector = 'body > app-root > div > app-trip > div.container-filter > app-filter > div > label';
        return element(by.css(selector)).getText();
    }

    detailsFromFirstTrip() {
        const selector = 'body > app-root > div > app-trip > div.card-deck.card-customer_container > div:nth-child(1) > a';
        element(by.css(selector)).click();
    }
}