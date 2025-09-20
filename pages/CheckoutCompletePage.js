const { expect } = require('@playwright/test');

class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getCompleteHeader() {
        return await this.completeHeader.textContent();
    }

    async getCompleteText() {
        return await this.completeText.textContent();
    }

    async backToProducts() {
        await this.backHomeButton.click();
    }

    async isOrderComplete() {
        return await this.completeHeader.isVisible();
    }
}

module.exports = CheckoutCompletePage;