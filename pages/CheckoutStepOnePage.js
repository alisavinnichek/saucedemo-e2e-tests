const { expect } = require('@playwright/test');

class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('.title');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }
}

module.exports = CheckoutStepOnePage;