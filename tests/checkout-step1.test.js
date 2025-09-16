const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
});

test('Валидация формы информации о доставке', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    
    // Проверяем что форма отображается
    await expect(checkoutStepOnePage.firstNameInput).toBeVisible();
    await expect(checkoutStepOnePage.lastNameInput).toBeVisible();
    await expect(checkoutStepOnePage.postalCodeInput).toBeVisible();
    await expect(checkoutStepOnePage.continueButton).toBeVisible();
    await expect(checkoutStepOnePage.cancelButton).toBeVisible();
});

test('Заполнение всех полей формы', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    
    await checkoutStepOnePage.fillShippingInfo('John', 'Doe', '90210');
    
    // Проверяем что поля заполнены
    await expect(checkoutStepOnePage.firstNameInput).toHaveValue('John');
    await expect(checkoutStepOnePage.lastNameInput).toHaveValue('Doe');
    await expect(checkoutStepOnePage.postalCodeInput).toHaveValue('90210');
});

test('Отмена оформления заказа', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    
    await checkoutStepOnePage.cancelCheckout();
    await expect(page).toHaveURL(/.*cart.html/);
});

test('Переход к обзору заказа после заполнения формы', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    
    await checkoutStepOnePage.fillShippingInfo('Jane', 'Smith', '12345');
    await checkoutStepOnePage.continueToOverview();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
});