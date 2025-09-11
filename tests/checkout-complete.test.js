const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test('Проверка работы CheckoutCompletePage', async ({ page }) => {
    console.log('Тестируем CheckoutCompletePage...');
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Проходим все шаги
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToCheckout();
    await checkoutStepTwoPage.finishCheckout();
    console.log('Заказ завершен');

    // Проверяем страницу завершения
    const completeTitle = await checkoutCompletePage.getPageTitle();
    expect(completeTitle).toBe('Checkout: Complete!');
    console.log('Страница завершения открыта');

    // Проверяем сообщение
    const isComplete = await checkoutCompletePage.isOrderComplete();
    expect(isComplete).toBeTruthy();
    console.log('Заказ успешно завершен');

    const completionMessage = await checkoutCompletePage.getCompletionMessage();
    console.log(`Сообщение: ${completionMessage}`);

    console.log('CheckoutCompletePage работает!');
});