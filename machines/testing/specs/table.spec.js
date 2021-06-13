const { provider } = require("./../framework/index");
const { browser } = provider;
const { LoginPage, TablesPage, AdminPage } = require("./../framework/pages/index");
const { expect } = provider.packages;
const { it, beforeEach, afterEach } = provider.testRunner;

describe("Tables sute", () => {
	beforeEach("Executes beforeEach", async () => {
		await browser.initBrowser("chromium", { headless: false, slowMo: 50 });
	});

	afterEach("Executes afterEach", async () => {
		await browser.closeBrowser();
	});

	describe("Add new machine to table", () => {
		it("should login as admin and add a new machine", async () => {
			const loginPage = new LoginPage();
			await loginPage.open();
			await loginPage.login({ name: "admin", password: "admin" });

			const tablePage = new TablesPage();
			await tablePage.addNewMachine({ mProducer: "tesla", mVolume: "10", mLength: "7.1", mWidth: "2.5", mWeight: "6500", mPower: "100", mPrice: "555555" });
			await tablePage.toAdminPage();

			const adminPage = new AdminPage();
			await adminPage.createUser({ username: "anav2", name: "andrei", email: "anav2@gmail.com", password: "andrei2", isAdmin: true });
			await tablePage.logout();

			await loginPage.open();
			await loginPage.login({ name: "anav2", password: "andrei2" });
			await tablePage.filterExisitngMachine({ mProducer: "tesla", mVolume: "10", mPrice: "555555" });
			//await tablePage.waitForTime(1000);
			expect(await tablePage.isMachineExistInArray("tesla")).toEqual(true);
		});
	});
});
