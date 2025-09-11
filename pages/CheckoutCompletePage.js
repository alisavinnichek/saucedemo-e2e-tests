class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator('#back-to-products');
        this.pageTitle = page.locator('.title');
    }

    async getCompletionMessage() {
        return await this.completeHeader.textContent();
    }

    async getCompletionText() {
        return await this.completeText.textContent();
    }

    async backToHome() {
        await this.backHomeButton.click();
    }

    async isOrderComplete() {
        const message = await this.getCompletionMessage();
        return message.includes('Thank you for your order!');
    }

    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}

module.exports = CheckoutCompletePage;