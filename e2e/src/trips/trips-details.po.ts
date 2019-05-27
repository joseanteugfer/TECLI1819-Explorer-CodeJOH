import { browser, by, element } from 'protractor';

export class TripsDetailsPage {

    checkIsTripsDetailsPage() {
        return element(by.css('#btnSubmit')).isPresent() ? true : false;
    }

    detailsFromFirstTrip(): void {
        const selector = 'body > app-root > div > app-trip > div.card-deck.card-customer_container > div:nth-child(1) > a';
        element(by.css(selector)).click();
    }

    getStatusTrip() {
        const selector = 'body > app-root > div > app-trip-details > div > div:nth-child(6) > div > span';
        const status = element(by.css(selector)).getText();
        return status;
    }

    checkTipNotStarted() {
        return new Promise((resolve, rejected) => {
            const selector = 'body > app-root > div > app-trip-details > div > div:nth-child(2) > div:nth-child(1) > span';
            element(by.css(selector)).getText().then(text => {
                const date_start = Date.parse(text);
                const date_now = Date.now();
                if (date_start > date_now) {
                    resolve(true);
                } else {
                    resolve(false);
                }

            });
        });
    }

    applyTrip(): void {
        element(by.css('#btnSubmit')).click();
    }
}