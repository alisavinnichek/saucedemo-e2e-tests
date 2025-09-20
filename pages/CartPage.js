const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getItemsCount() {
        return await this.cartItems.count();
    }

    async getItemName(index = 0) {
        return await this.itemNames.nth(index).textContent();
    }

    async getItemPrice(index = 0) {
        return await this.itemPrices.nth(index).textContent();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;