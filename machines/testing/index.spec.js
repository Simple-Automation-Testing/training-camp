const { chromium, firefox, webkit } = require("playwright");
const { LoginPage, TablesPage, AdminPage } = require("./framework/pages/index");
const { expect } = require("chai");

describe("Login file", () => {
	let browser = null;
	let context = null;
	let page = null;

	beforeEach(async () => {
		browser = await chromium.launch({ headless: false, slowMo: 50 });
		context = await browser.newContext();
		page = await context.newPage();
	});

	afterEach(async () => {
		await browser.close();
	});

	describe("Check-in in the app", async () => {
		it("should check-in a new user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.switchTo("checkin");
			await loginPage.checkIn({ username: "anav", name: "andrei", email: "anav@gmail.com", password: "andrei" });

			const tablePage = new TablesPage(page);
			expect(await tablePage.getTitle()).to.equal("Таблиці, Привіт anav");
		});
	});

	describe("Login to the app", async () => {
		it("should login an exisiting user and redirect him to Tables page", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			expect(await tablePage.getTitle()).to.equal("Таблиці, Привіт admin");
		});
	});

	describe("Enter to admin page", () => {
		it.only("should redirect admin to Admin cabinet", async () => {
			const loginPage = new LoginPage(page);
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage(page);
			expect(await tablePage.getTitle()).to.equal("Таблиці, Привіт admin");
			await tablePage.toAdminPage();

			const adminPage = new AdminPage(page);
			expect(await adminPage.getTitle()).to.equal("Кабінет адміністратора, Привіт admin");
		});
	});
});
