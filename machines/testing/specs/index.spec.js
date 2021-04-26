const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage, AdminPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeEach, afterEach } = provider.testRunner;

describe("Login file", () => {
	let browserInstance = null;
	let context = null;
	let page = null;

	beforeEach("Executes beforeEach", async () => {
		browserInstance = await browser.initBrowser("chromium", { headless: false, slowMo: 50 });
		context = await browser.createNewContext(browserInstance);
		await browser.setStorage(context);
		page = await browser.createNewPage(context);
	});

	afterEach("Executes afterEach", async () => {
		await browser.closeBrowser(browserInstance);
	});

	describe("Check-in to the app as new user", async () => {
		it("should check-in a new user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.switchTo("checkin");
			await loginPage.checkIn({ username: "anav", name: "andrei", email: "anav@gmail.com", password: "andrei" });

			const tablePage = new TablesPage(page);
			expect(await tablePage.getTitle()).toEqual("Таблиці, Привіт anav");
		});
	});

	describe("Login to the app as exisitng user", async () => {
		it("should login an exisiting user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			expect(await tablePage.getTitle()).toEqual("Таблиці, Привіт admin");
		});
	});

	describe("Get to admin cabinet", () => {
		it("should login the admin and redirect him to Admin page", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			await tablePage.toAdminPage();

			const adminPage = new AdminPage(page);
			expect(await adminPage.getTitle()).toEqual("Кабінет адміністратора, Привіт admin");
		});
	});

	describe("Create new user via admin cabinet", () => {
		it("should create new user with role User", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			await tablePage.toAdminPage();

			const adminPage = new AdminPage(page);
			await adminPage.createUser({ username: "anav1", name: "andrei", email: "anav1@gmail.com", password: "andrei1" });
			expect(await adminPage.isUserExistInArray("anav1")).toEqual(true);
		});

		it("should create new user with role Admin", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			await tablePage.toAdminPage();

			const adminPage = new AdminPage(page);
			await adminPage.createUser({ username: "anav2", name: "andrei", email: "anav2@gmail.com", password: "andrei2", isAdmin: true });
			expect(await adminPage.isUserExistInArray("anav2")).toEqual(false);
			expect(await adminPage.isUserAdmin("anav2")).toEqual(false);
		});
	});
});
