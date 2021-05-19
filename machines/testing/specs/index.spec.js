const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage, AdminPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeEach, afterEach, beforeAll, afterAll } = provider.testRunner;

describe("Login sute", () => {
	beforeEach("Executes beforeEach", async () => {
		await browser.initBrowser("chromium", { headless: false, slowMo: 50 });
	});

	afterEach("Executes afterEach", async () => {
		await browser.closeBrowser();
	});

	describe("Login to the app as exisitng user", async () => {
		it("should login an exisiting user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage();
			expect(await tablePage.getTitle()).toEqual("Таблиці, Привіт admin");
		});
	});

	describe("Get to admin cabinet", () => {
		it("should login the admin and redirect him to Admin page", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage();
			await tablePage.toAdminPage();

			const adminPage = new AdminPage();
			expect(await adminPage.getTitle()).toEqual("Кабінет адміністратора, Привіт admin");
		});
	});
});
