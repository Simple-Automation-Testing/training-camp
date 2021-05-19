const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage, AdminPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeEach, afterEach, beforeAll, afterAll } = provider.testRunner;

describe("Login sute", () => {
	describe("Create new user via admin cabinet", () => {
		beforeEach("Executes beforeEach", async () => {
			await browser.initBrowser("chromium", { headless: false, slowMo: 50 });
		});

		afterEach("Executes afterEach", async () => {
			await browser.closeBrowser();
		});

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
			expect(await adminPage.isUserExistInArray("anav2")).toEqual(false);
			expect(await adminPage.isUserAdmin("anav2")).toEqual(false);
		});
	});
});
