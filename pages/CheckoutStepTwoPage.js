const { expect } = require('@playwright/test');

class CheckoutStepTwoPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.cancelButton = page.locator('#cancel');
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getItemTotal() {
        return await this.itemTotal.textContent();
    }

    async getTax() {
        return await this.tax.textContent();
    }

    async getTotal() {
        return await this.total.textContent();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}

module.exports = CheckoutStepTwoPage;