const {chromium, firefox, webkit} = require('playwright');
const {LoginPage, TablesPage} = require('./framework/pages/index');
const {expect} = require('chai');

describe('Login file', () => {

    let browser = null;
    let context = null;
    let page = null;

    beforeEach( async () => {
        browser = await chromium.launch({ headless: false, slowMo: 50 });
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await browser.close();
    });

    describe('Check-in in the app', async () => {
        it('should check-in a new user and redirect him to Tables page', async () => {
            const loginPage = new LoginPage(page);
            await loginPage.switchTo('checkin');
            await loginPage.checkIn('andrei', 'andrei', 'andrei', 'andrei');

            expect(await page.textContent(TablesPage.TITLE)).to.equal('Таблиці, Привіт andrei');
        });
    });

    describe('Login to the app', async () => {
        it('should login an exisiting user and redirect him to Tables page', async () => {
            const loginPage = new LoginPage(page);
            await loginPage.switchTo('login');
            await loginPage.login('admin', 'admin');

            expect(await page.textContent(TablesPage.TITLE)).to.equal('Таблиці, Привіт admin');
        });
    });

});

