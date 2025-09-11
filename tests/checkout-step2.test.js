const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');

test('Проверка работы CheckoutStepTwoPage', async ({ page }) => {
    console.log('Тестируем CheckoutStepTwoPage...');
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    // Проходим все предыдущие шаги
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToCheckout();
    console.log('Перешли на второй шаг оформления');

    // Проверяем второй шаг
    const overviewTitle = await checkoutStepTwoPage.getPageTitle();
    expect(overviewTitle).toBe('Checkout: Overview');
    console.log('Страница Overview открыта');

    // Проверяем товары
    const orderItems = await checkoutStepTwoPage.getItemNames();
    expect(orderItems.length).toBe(1);
    console.log(`Товар в заказе: ${orderItems[0]}`);

    // Проверяем сумму
    const totalPrice = await checkoutStepTwoPage.getTotalPrice();
    expect(totalPrice).toContain('$');
    console.log(`Общая сумма: ${totalPrice}`);

    console.log('CheckoutStepTwoPage работает!');
});