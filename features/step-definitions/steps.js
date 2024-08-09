const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("a login to Ecommerce application with {string} and {string}", { timeout: 100 * 1000 }, async function (username, password) {
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When("Add {string} to Cart", async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.checkOut();
})

When('Enter valid details and Place the Order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.submitAndGetOrderId();
  console.log(this.orderId);
});

Then("Verify order is present in the OrderHistory", async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})

Given("a login to Ecommerce2 application with {string} and {string}", async function (username, password) {
  const userName = this.page.locator('#username');
  const signIn = this.page.locator("#signInBtn");

  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  await userName.fill(username);
  await this.page.locator("[type='password']").fill(password);
  await signIn.click();
});

Then('Verify error message is displayed', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

