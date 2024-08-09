const { test } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

test.beforeAll(() => {
  console.log("i am the first");
  // mydata = await JSON.parse(JSON.stringify(require("./utils/data.json")));


})
for (const data of dataset) {

  test(`testing with ${data.email}`, async ({ page, person }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const username = "anshika@gmail.com";
    const password = "Iamking@000"
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.checkout();

  });
}