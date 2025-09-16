const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
});

test('Отображение страницы корзины', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    const title = await cartPage.getTitle();
    expect(title).toBe('Your Cart');
});

test('Проверка товара в корзине', async ({ page }) => {
    const cartPage = new CartPage(page);
    const inventoryPage = new InventoryPage(page);
    
    const itemsCount = await cartPage.getItemsCount();
    expect(itemsCount).toBe(1);
    
    const cartItemName = await cartPage.getItemName();
    const inventoryItemName = await inventoryPage.getFirstProductName();
    
    expect(cartItemName).toBe(inventoryItemName);
});

test('Переход к оформлению заказа', async ({ page }) => {
    const cartPage = new CartPage(page);
    
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
});