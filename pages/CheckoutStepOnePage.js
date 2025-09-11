class CheckoutStepOnePage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.pageTitle = page.locator('.title');
    }

    async fillUserInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToCheckout() {
        await this.continueButton.click();
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}

module.exports = CheckoutStepOnePage;