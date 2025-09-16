const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');

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
});

test('Отображение страницы обзора заказа', async ({ page }) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    
    const title = await checkoutStepTwoPage.getTitle();
    expect(title).toBe('Checkout: Overview');
    
    // Проверяем что все элементы отображаются
    await expect(checkoutStepTwoPage.itemTotal).toBeVisible();
    await expect(checkoutStepTwoPage.tax).toBeVisible();
    await expect(checkoutStepTwoPage.total).toBeVisible();
    await expect(checkoutStepTwoPage.finishButton).toBeVisible();
    await expect(checkoutStepTwoPage.cancelButton).toBeVisible();
});

test('Проверка расчета сумм заказа', async ({ page }) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    
    const itemTotal = await checkoutStepTwoPage.getItemTotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();
    
    expect(itemTotal).toContain('Item total: $');
    expect(tax).toContain('Tax: $');
    expect(total).toContain('Total: $');
    
    const itemTotalValue = parseFloat(itemTotal.replace('Item total: $', ''));
    const totalValue = parseFloat(total.replace('Total: $', ''));
    expect(totalValue).toBeGreaterThan(itemTotalValue);
});

test('Отмена заказа на этапе обзора', async ({ page }) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    
    await checkoutStepTwoPage.cancelCheckout();
    await expect(page).toHaveURL(/.*inventory.html/);
});

test('Завершение заказа', async ({ page }) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    
    await checkoutStepTwoPage.finishOrder();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
});