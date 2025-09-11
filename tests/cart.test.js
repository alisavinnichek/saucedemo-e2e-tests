const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

test('Проверка работы CartPage', async ({ page }) => {
    console.log('Тестируем CartPage...');
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Логинимся и добавляем товар
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addFirstItemToCart();
    console.log('Товар добавлен в корзину');

    // Переходим в корзину
    await inventoryPage.openCart();
    
    const cartTitle = await cartPage.getPageTitle();
    expect(cartTitle).toBe('Your Cart');
    console.log('Корзина открыта');

    // Проверяем товары в корзине
    const itemsCount = await cartPage.getItemsCount();
    expect(itemsCount).toBe(1);
    console.log('Количество товаров верное');

    const itemNames = await cartPage.getItemNames();
    expect(itemNames.length).toBe(1);
    console.log(`Товар в корзине: ${itemNames[0]}`);

    console.log('CartPage работает!');
});