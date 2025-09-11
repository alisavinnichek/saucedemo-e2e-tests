const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

test('Проверка работы InventoryPage', async ({ page }) => {
    console.log('Тестируем InventoryPage...');
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Логинимся
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    console.log('Логин выполнен');

    // Проверяем InventoryPage
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
    console.log('Заголовок верный');

    // Добавляем товар в корзину
    await inventoryPage.addFirstItemToCart();
    const cartCount = await inventoryPage.getCartItemsCount();
    expect(cartCount).toBe(1);
    console.log('Товар добавлен в корзину');

    // Проверяем название товара
    const itemName = await inventoryPage.getFirstItemName();
    expect(itemName).toBeTruthy();
    console.log(`Название товара: ${itemName}`);

    console.log('InventoryPage работает!');
});