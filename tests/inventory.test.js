const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
});

test('Отображение страницы товаров', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    const title = await inventoryPage.getTitle();
    expect(title).toBe('Products');
});

test('Сортировка товаров по цене (от высокой к низкой)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    await inventoryPage.sortByPriceHighToLow();
    const firstProductPrice = await inventoryPage.getFirstProductPrice();
    
    expect(firstProductPrice).toBe('$49.99'); // Самый дорогой товар
});

test('Добавление товара в корзину', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    await inventoryPage.addFirstProductToCart();
    const cartCount = await inventoryPage.getCartItemsCount();
    
    expect(cartCount).toBe(1);
});