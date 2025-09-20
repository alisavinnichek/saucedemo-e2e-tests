const { expect } = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.addToCartButtons = page.locator('button.btn_inventory');
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async sortByPriceHighToLow() {
        await this.sortDropdown.selectOption('hilo');
        await this.page.waitForTimeout(500);
    }

    async getFirstProductName() {
        return await this.productNames.first().textContent();
    }

    async getFirstProductPrice() {
        return await this.productPrices.first().textContent();
    }

    async addFirstProductToCart() {
        await this.addToCartButtons.first().click();
    }

    async getCartItemsCount() {
        if (await this.cartBadge.isVisible()) {
            return parseInt(await this.cartBadge.textContent());
        }
        return 0;
    }

    async goToCart() {
        await this.cartLink.click();
    }
}

module.exports = InventoryPage;