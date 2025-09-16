const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

test('Полный E2E тест покупки самого дорогого товара', async ({ page }) => {
    test.setTimeout(60000);
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // 1. Логин и проверка
    await loginPage.navigate(); // ИСПРАВЛЕНО: navigate() вместо open()
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
    
    const inventoryTitle = await inventoryPage.getTitle();
    expect(inventoryTitle).toBe('Products');

    // 2. Поиск и добавление самого дорогого товара
    await inventoryPage.sortByPriceHighToLow();
    const productName = await inventoryPage.getFirstProductName();
    const productPrice = await inventoryPage.getFirstProductPrice();
    
    expect(productPrice).toBe('$49.99'); // Проверяем что это действительно самый дорогой
    
    await inventoryPage.addFirstProductToCart();
    const cartCount = await inventoryPage.getCartItemsCount();
    expect(cartCount).toBe(1);

    // 3. Переход в корзину и проверка
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
    
    const cartTitle = await cartPage.getTitle();
    expect(cartTitle).toBe('Your Cart');
    
    const itemsCount = await cartPage.getItemsCount();
    expect(itemsCount).toBe(1);
    
    const cartItemName = await cartPage.getItemName();
    const cartItemPrice = await cartPage.getItemPrice();
    expect(cartItemName).toBe(productName);
    expect(cartItemPrice).toBe(productPrice);

    // 4. Оформление заказа - шаг 1
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    const stepOneTitle = await checkoutStepOnePage.getTitle();
    expect(stepOneTitle).toBe('Checkout: Your Information');
    
    await checkoutStepOnePage.fillShippingInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continueToOverview();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // 5. Оформление заказа - шаг 2
    const stepTwoTitle = await checkoutStepTwoPage.getTitle();
    expect(stepTwoTitle).toBe('Checkout: Overview');
    
    const itemTotal = await checkoutStepTwoPage.getItemTotal();
    expect(itemTotal).toContain(productPrice);
    
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();
    
    expect(tax).toContain('Tax: $');
    expect(total).toContain('Total: $');

    // 6. Завершение заказа
    await checkoutStepTwoPage.finishOrder();
    await expect(page).toHaveURL(/.*checkout-complete.html/);

    // 7. Проверка успешного завершения
    const completeTitle = await checkoutCompletePage.getTitle();
    expect(completeTitle).toBe('Checkout: Complete!');
    
    const completeHeader = await checkoutCompletePage.getCompleteHeader();
    expect(completeHeader).toBe('Thank you for your order!');
    
    const completeText = await checkoutCompletePage.getCompleteText();
    expect(completeText).toContain('Your order has been dispatched');
    
    const isComplete = await checkoutCompletePage.isOrderComplete();
    expect(isComplete).toBeTruthy();

    // 8. Возврат на главную
    await checkoutCompletePage.backToProducts();
    await expect(page).toHaveURL(/.*inventory.html/);
});