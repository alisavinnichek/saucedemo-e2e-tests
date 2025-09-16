const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillShippingInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToOverview();
    
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await checkoutStepTwoPage.finishOrder();
});

test('Отображение страницы завершения заказа', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    const title = await checkoutCompletePage.getTitle();
    expect(title).toBe('Checkout: Complete!');
    
    const completeHeader = await checkoutCompletePage.getCompleteHeader();
    expect(completeHeader).toBe('Thank you for your order!');
    
    const completeText = await checkoutCompletePage.getCompleteText();
    expect(completeText).toContain('Your order has been dispatched');
    
    // Проверяем что кнопка возврата отображается
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
});

test('Проверка успешного завершения заказа', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    const isComplete = await checkoutCompletePage.isOrderComplete();
    expect(isComplete).toBeTruthy();
    
    const completeHeader = await checkoutCompletePage.getCompleteHeader();
    expect(completeHeader).toBe('Thank you for your order!');
});

test('Возврат на главную страницу после завершения заказа', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await checkoutCompletePage.backToProducts();
    await expect(page).toHaveURL(/.*inventory.html/);
});

test('Элементы страницы завершения заказа', async ({ page }) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    // Проверяем что все элементы отображаются
    await expect(checkoutCompletePage.title).toBeVisible();
    await expect(checkoutCompletePage.completeHeader).toBeVisible();
    await expect(checkoutCompletePage.completeText).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
    
    // Проверяем содержимое
    const header = await checkoutCompletePage.getCompleteHeader();
    const text = await checkoutCompletePage.getCompleteText();
    
    expect(header).toBe('Thank you for your order!');
    expect(text).toContain('Your order has been dispatched');
});