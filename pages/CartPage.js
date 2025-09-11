class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
        this.cartTitle = page.locator('.title');
    }

    async getItemsCount() {
        return await this.cartItems.count();
    }

    async getItemNames() {
        const names = [];
        const count = await this.itemNames.count();
        
        for (let i = 0; i < count; i++) {
            names.push(await this.itemNames.nth(i).textContent());
        }
        
        return names;
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async getPageTitle() {
        return await this.cartTitle.textContent();
    }
}

module.exports = CartPage;