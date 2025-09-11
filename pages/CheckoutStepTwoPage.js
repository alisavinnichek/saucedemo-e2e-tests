class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.itemNames = page.locator('.inventory_item_name');
        this.totalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.pageTitle = page.locator('.title');
    }

    async getItemNames() {
        const names = [];
        const count = await this.itemNames.count();
        
        for (let i = 0; i < count; i++) {
            names.push(await this.itemNames.nth(i).textContent());
        }
        
        return names;
    }

    async getTotalPrice() {
        return await this.totalLabel.textContent();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}

module.exports = CheckoutStepTwoPage;