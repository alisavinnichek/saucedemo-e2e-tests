const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');

test('Проверка работы CheckoutStepOnePage', async ({ page }) => {
    console.log('Тестируем CheckoutStepOnePage...');
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    // Логинимся, добавляем товар, переходим в корзину
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    console.log('Корзина открыта');

    // Начинаем оформление
    await cartPage.goToCheckout();
    
    const checkoutTitle = await checkoutStepOnePage.getPageTitle();
    expect(checkoutTitle).toBe('Checkout: Your Information');
    console.log('Страница оформления открыта');

    // Заполняем информацию
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    console.log('Информация заполнена');

    // Продолжаем
    await checkoutStepOnePage.continueToCheckout();
    console.log('Переход на следующий шаг');

    console.log('CheckoutStepOnePage работает!');
});