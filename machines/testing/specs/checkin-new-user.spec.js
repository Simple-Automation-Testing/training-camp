const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeAll, afterAll } = provider.testRunner;

describe("Login sute", () => {
	beforeAll("Executes beforeEach", async () => {
		await browser.initBrowser("chromium", { headless: false, slowMo: 50 });
	});

	afterAll("Executes afterEach", async () => {
		await browser.closeBrowser();
	});

	describe("Check-in to the app as new user", async () => {
		it("should check-in a new user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.switchTo("checkin");
			await loginPage.checkIn({ username: "anav", name: "andrei", email: "anav@gmail.com", password: "andrei" });

			const tablePage = new TablesPage();
			expect(await tablePage.getTitle()).toEqual("Таблиці, Привіт anav");
		});
	});
});
