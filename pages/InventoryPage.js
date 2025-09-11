class InventoryPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.addToCartButtons = page.locator('button.btn_inventory');
        this.itemNames = page.locator('.inventory_item_name');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    async addFirstItemToCart() {
        await this.addToCartButtons.first().click();
    }

    async getCartItemsCount() {
        if (await this.cartBadge.isVisible()) {
            return parseInt(await this.cartBadge.textContent());
        }
        return 0;
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getFirstItemName() {
        return await this.itemNames.first().textContent();
    }
}

module.exports = InventoryPage;