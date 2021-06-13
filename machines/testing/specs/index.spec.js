const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage, AdminPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeEach, afterEach } = provider.testRunner;

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

	describe("Create new user via admin cabinet", () => {
		it("should create new user with role User", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage();
			await tablePage.toAdminPage();

			const adminPage = new AdminPage();
			await adminPage.createUser({ username: "anav1", name: "andrei", email: "anav1@gmail.com", password: "andrei1" });
			expect(await adminPage.isUserExistInArray("anav1")).toEqual(true);
		});

		it("should create new user with role Admin", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage();
			await tablePage.toAdminPage();

			const adminPage = new AdminPage();
			await adminPage.createUser({ username: "anav2", name: "andrei", email: "anav2@gmail.com", password: "andrei2", isAdmin: true });
			expect(await adminPage.isUserExistInArray("anav2")).toEqual(true);
			expect(await adminPage.isUserAdmin("anav2")).toEqual(true);
		});
	});

	describe("Check-in to the app as new user", async () => {
		it("should check-in a new user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.switchTo("checkin");
			await loginPage.checkIn({ username: "anav", name: "andrei", email: "anav@gmail.com", password: "andrei" });

			const tablePage = new TablesPage();
			await tablePage.waitForTime(1000);
			expect(await tablePage.getTitle()).toEqual("Таблиці, Привіт anav");
		});
	});
});
