import { LoginPage } from "./src/login/login.po";

describe('Login in App', () => {
    let login: LoginPage;

    beforeEach(() => {
        login = new LoginPage();
    });

    it('Login succesfully', () => {
        login.navigateTo();
    });
});