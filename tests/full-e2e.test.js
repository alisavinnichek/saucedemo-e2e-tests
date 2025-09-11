const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test('Полный E2E тест покупки', async ({ page }) => {
    console.log('Запуск полного E2E теста...');
    
    // Инициализация всех Page Objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Логин
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    console.log('Логин выполнен');

    // Добавление товара
    await inventoryPage.addFirstItemToCart();
    const cartCount = await inventoryPage.getCartItemsCount();
    expect(cartCount).toBe(1);
    console.log('Товар добавлен в корзину');

    // Переход в корзину
    await inventoryPage.openCart();
    const itemsInCart = await cartPage.getItemsCount();
    expect(itemsInCart).toBe(1);
    console.log('Корзина открыта');

    // Оформление заказа
    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToCheckout();
    console.log('Информация заполнена');

    // Подтверждение заказа
    const totalPrice = await checkoutStepTwoPage.getTotalPrice();
    await checkoutStepTwoPage.finishCheckout();
    console.log(`Заказ оформлен, сумма: ${totalPrice}`);

    // Проверка завершения
    const isComplete = await checkoutCompletePage.isOrderComplete();
    expect(isComplete).toBeTruthy();
    console.log('ЗАКАЗ УСПЕШНО ЗАВЕРШЕН!');

    console.log('ВСЕ PAGE OBJECTS РАБОТАЮТ КОРРЕКТНО!');
});